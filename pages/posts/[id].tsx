import Layout from '@/components/layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Date from '@/components/date'
import utilStyles from '@/styles/utils.module.css'

interface PostData {
  postData: {
    id: string
    title: string
    date: string
    contentHtml: string
  }
}

export default function Post({ postData }: PostData) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Add the "await" keyword like this:
  const postData = await getPostData([params?.id].flat(Infinity).filter(Boolean).join('')) // TODO
  return {
    props: {
      postData,
    },
  }
}
