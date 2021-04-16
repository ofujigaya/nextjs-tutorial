import Layout from '@/components/layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PostData {
  postData: {
    id: string
    title: string
    date: string
  }
}

export default function Post({ postData }: PostData) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
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
  const postData = getPostData([params?.id].flat(Infinity).filter(Boolean).join('')) // TODO
  return {
    props: {
      postData,
    },
  }
}
