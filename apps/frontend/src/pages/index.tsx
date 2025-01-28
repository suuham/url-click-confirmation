import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <h1>テンプレート</h1>
      <p>だんらく</p>
      <span>すぱん</span>
      <span>すぱーん</span>
    </DefaultLayout>
  )
}

export default Home
