import { getMedia } from "@/features/server/media/mediaQueries";
import { upperFirst } from "lodash";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CreateReviewForm from "../../../../../../components/Review/CreateReviewForm";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "@/lib/i18n/routing";

export async function generateMetadata(
	props: {
		params: Promise<{
			lang: string;
			media_id: number;
		}>;
	}
) {
	const params = await props.params;
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.create.metadata' });
	const { data: media, error } = await getMedia({
		locale: params.lang,
		id: params.media_id,
	});
	if (error) throw error;
	if (!media) return { title: upperFirst(common('errors.film_not_found')) };
	return {
	  title: t('title', { title: media.title! }),
	  description: t('description', { title: media.title! }),
	};
}

export default async function CreateReviewPage(
	props: {
		params: Promise<{
			lang: string;
			media_id: number;
		}>;
	}
) {
	const params = await props.params;
	const supabase = await createServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return redirect({
		href: `/auth/login?redirect=${encodeURIComponent(`/review/create/${params.media_id}`)}`,
		locale: params.lang,
	});
	const { data: review } = await supabase
		.from('user_review')
		.select(`id, activity:user_activity!inner(media_id)`)
		.eq('user_id', user.id)
		.eq('activity.media_id', params.media_id)
		.single();
	if (review) redirect({
		href: `/review/${review.id}`,
		locale: params.lang,
	});

	const { data: media, error } = await getMedia({
		locale: params.lang,
		id: params.media_id,
	});
	if (error) throw error;
	if (!media) notFound();

	return <CreateReviewForm media={media} />;
};