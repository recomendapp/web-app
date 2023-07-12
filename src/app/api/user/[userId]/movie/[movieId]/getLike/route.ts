import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { userId: string, movieId: string } }) => {
  const { userId, movieId } = params
  try {
    const response = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
      [
        Query.equal('userId', String(userId)),
        Query.equal('movieId', String(movieId)),
      ]
    );
    if (response.documents.length > 0) {
      const document = response.documents[0];
      return NextResponse.json({
        id: document.$id,
        status: true,
      }, {
        status: 200
      });
    } else {
      return NextResponse.json({
        id: '',
        status: false,
      }, {
        status: 201
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'état de like :', error);
    return NextResponse.json({
      error: 'Erreur lors de la récupération de l\'état de like',
    }, { status: 500 });
  }
};



// import { databases } from "@/utils/appwrite";
// import { Query } from "appwrite";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function getLike(req: NextApiRequest, res: NextApiResponse) {
//     console.log('WOUZOUFJHSGFJHYEGFJSHEYHFGSJEUYFH')
//     const { userId, movieId } = req.query;
  
//     try {
//       const response = await databases.listDocuments(
//         String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
//         String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
//         [
//           Query.equal('userId', String(userId)),
//           Query.equal('movieId', String(movieId)),
//         ]
//       );
  
//       if (response.documents.length > 0) {
//         const document = response.documents[0];
//         res.status(200).json({
//           id: document.$id,
//           status: true,
//         });
//       } else {
//         res.status(200).json({
//           id: '',
//           status: false,
//         });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération de l\'état de like :', error);
//       res.status(500).json({
//         message: 'Erreur lors de la récupération de l\'état de like',
//       });
//     }
// }
  
  
  
  
  