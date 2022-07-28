
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/home.module.scss';

import Image from 'next/image';
import techsImage from '../../public/images/techs.svg'

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';


type Content = {
    title: string;
    titleContent: string;
    link_action: string;
    mobileTitle: string;
    mobileContent: string;
    mobileBanner: string;
    webTitle: string;
    webContent: string;
    webBanner: string;
}

interface ContentProps{
  content: Content;
}

export default function Home( { content }:ContentProps) {
  //console.log(content);
 return(
  <>
    <Head>
      <title>Apaixonadao por Tecnologia - Sujeito Programador </title>
    </Head>

    <main className={styles.container}>
      <div  className={styles.containerHeader}>
        <section className={styles.ctaText}>
          <h1>{content.title}</h1>
          <span>
            {content.titleContent}
          </span>
          
          <a href={content.link_action}><br></br>
            <button> COMEÇAR AGORA</button>
          </a>
         
        </section>
        <img src='images/banner-conteudos.png' alt='Imagem de conteúdos'/>
      </div>

      <hr className={styles.divisor}/>

      <div className={styles.sectionContent}>
        <section>
          <h2> {content.mobileTitle}</h2>
          <span> {content.mobileContent} </span>      
          
        </section>
        <img src={content.mobileBanner} alt='Image Mobile Apps/'/>


      </div>

      <hr className={styles.divisor}/>

      <div className={styles.sectionContent}>

        <img src={content.webBanner} alt='Imagem Web desenvolvimento'/>
        <section>
          <h2> {content.webTitle}</h2>
          <span>{content.webContent} </span>          
          
        </section>
      </div>

      <div className={styles.nextLevelContent}>
        <Image src={techsImage} alt='Imagem tecnologias'/>
        <h2>Mais de <span className={styles.alunos}>15 mil alunos</span> já levaram sua carreira ao próximo nível.</h2>
        <span className={styles.alunosText}>E vc vai perder a chance de evoluir?</span>
        <a href={content.link_action} >
          <button>ACESSAR TURMA</button>
        </a>
      </div>


    </main>
  
  </>
 )
}


export const getStaticProps: GetStaticProps = async () =>{
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  //console.log(response.results[0].data)

  const {
    title, sub_title, link_action,
    mobile, mobile_content,mobile_banner,
    title_web, web_content,web_banner
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    link_action: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  };

  return{
    props:{
      content
    },
    revalidate:60*1 //a cada 2 minutos
  }
}