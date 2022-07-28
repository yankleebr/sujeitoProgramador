
import { GetServerSideProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import styles from './post.module.scss';
import Head from 'next/head';
import Image from 'next/image';

interface PostsProps{
    post:{
        slug:string;
        title:string;
        description:string;
        cover:string;
        updateAt:string;
    }
}



export default function Post({post}: PostsProps){
    //console.log(post)

    return(
        <>
        <Head>
            <title>{post.title}</title>
        </Head>
        
        <main className={styles.container}>
            <article className={styles.post}>
                <Image
                    src={post.cover}
                    width={720}
                    height={410}
                    alt={post.title}
            
                
                />
                <h1>{post.title}</h1>
                <time>{post.updateAt}</time>
                <div className={styles.postcontent} dangerouslySetInnerHTML = {{ __html:post.description}}  ></div>
            </article>

        </main>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const{slug}=params;
    //console.log(slug);

    const prismic = getPrismicClient(req);
    const response = await prismic.getByUID('post',String(slug),{});
    //console.log(response.data)

    if(!response){
        return{
            redirect:{
                destination:'/posts',
                permanent:false
            }
        }
    }

    const post = {
        slug:slug,
        title:RichText.asText(response.data.title),
        description:RichText.asHtml(response.data.description),
        cover:response.data.cover.url,
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month:'long',
            year:'numeric'
        })
    }

    return {
        props:{
            post

        }
    }
}