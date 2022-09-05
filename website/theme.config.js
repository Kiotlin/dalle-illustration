/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-empty-pattern */
import { useRouter } from 'next/router'
import Image from 'next/image'

const Logo = () => {
    return (
        <Image
            id="logo"
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            alt="Logo"
            height={50}
            width={50}
        />
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  projectLink: 'https://github.com/Kiotlin/dalle-polaroid',
  docsRepositoryBase: 'https://github.com/Kiotlin/dalle-polaroid/blob/main/website/pages',
  search: true,
  titleSuffix: '',
  floatTOC: true,
  defaultMenuCollapsed: true,
  logo: () => {
    const { route } = useRouter()
    return (
      <>
        <Logo />
        {route === '/' ? null : (
          <span
            className='mx-2 font-extrabold hidden md:inline select-none'
            title='DALLE-Polaroid'
            style={{ whiteSpace: 'nowrap' }}
          >
            DALLE POLAROID
          </span>
        )}
      </>
    )
  },
  head: ({ title, meta }) => {
    const ogImage =
      'https://raw.githubusercontent.com/Kiotlin/dalle-polaroid/master/public/preview.png'

    return (
      <>
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta httpEquiv='Content-Language' content='en' />
        <meta
          name='description'
          content={meta.description || 'Make your unique polaroid style photo using DALL-E.'}
        />
        <meta
          name='og:description'
          content={meta.description || 'Make your unique polaroid style photo using DALL-E.'}
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@Kiokh_' />
        <meta name='twitter:image' content={ogImage} />
        <meta name='og:title' content={title ? title + ' – DALLE POLAROID' : 'DALLE POLAROID'} />
        <meta name='og:image' content={ogImage} />
        <meta name='apple-mobile-web-app-title' content='DALLE POLAROID' />
      </>
    )
  },
  footerText: ({ }) => {
    return (
      <p className='no-underline text-current font-semibold'>
        Made by{' '}
        <a
          href='https://twitter.com/Kiokh_'
          target='_blank'
          rel="noopener noreferrer"
          className='no-underline font-semibold'
        >
          @Kiokh_
        </a>
        , deployed on{' '}
        <a
          href='https://vercel.com/'
          target='_blank'
          rel="noopener noreferrer"
          className='no-underline font-semibold'
        >
          Vercel
        </a>
        .
      </p>
    )
  },
  gitTimestamp: true,
}