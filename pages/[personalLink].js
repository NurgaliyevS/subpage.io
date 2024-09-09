import { useState } from 'react';
import clientPromise from '../backend/mongodbClient';
import Image from 'next/image';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { personalLink } = context.params;

  try {
    const client = await clientPromise;
    const db = client.db();

    const landingPage = await db.collection('landingpages').findOne({ personalLink });

    if (!landingPage) {
      return { notFound: true };
    }

    return {
      props: {
        landingPage: JSON.parse(JSON.stringify(landingPage)),
      },
    };
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return { notFound: true };
  }
}

function LandingPageTemplate({ landingPage }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement email submission logic here
  };

  console.log(landingPage, 'landing page')

  return (
    <main className="min-h-screen" data-theme={landingPage?.customizations?.theme} style={{ fontFamily: landingPage?.customizations?.font }}>
      <div className="relative min-h-screen bg-base-200" data-theme={landingPage?.customizations?.theme}>
        <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col max-lg:pb-16 lg:flex-row">
          <section className="shrink-0 space-y-4 p-6 lg:w-[350px] lg:space-y-8 lg:p-16 lg:pr-0 xl:w-[500px] xl:pr-16">
            <div className="flex items-start justify-start gap-4 lg:flex-col lg:gap-8">
              {landingPage?.content?.showUserIcon && (
                <span className="relative shrink-0">
                  <img
                    alt={`${landingPage?.content?.userName} profile picture`}
                    src={landingPage?.content?.userImage}
                    width={176}
                    height={176}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full shadow-[0_0_0px_1px_rgba(0,0,0,0.06)]"></div>
                </span>
              )}
              <div className="flex-1">
                <h1 className="mb-1 text-xl font-bold lg:mb-3 lg:text-4xl lg:font-extrabold">{landingPage?.content?.mainHeadline}</h1>
                <div className="flex flex-col gap-1 lg:flex-row lg:gap-4"></div>
              </div>
            </div>
            <div className="reactMarkDown -space-y-4 leading-relaxed lg:text-lg">
              <p>{landingPage?.content?.mainDescription}</p>
            </div>
            {landingPage?.content?.showEmailInput && (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="example@gmail.com"
                />
                {landingPage?.content?.showCTAButton && (
                  <button type="submit" className="btn btn-primary mt-2 w-full">{landingPage?.content?.ctaText}</button>
                )}
              </form>
            )}
          </section>
          <section className="noscrollbar w-full max-w-[1100px] lg:h-screen lg:overflow-scroll">
            <div className="divider my-0 px-6 lg:hidden"></div>
            <ul className="p-6 max-lg:space-y-4 lg:grid lg:grid-cols-2 lg:gap-8 lg:p-16">
              {landingPage?.content?.products && landingPage?.content?.products.map((product, index) => (
                <li key={index} className="card h-min bg-base-100 duration-200 col-span-1">
                  <Link href={product?.productURL} target="_blank" className="group rounded-box cursor-pointer p-4 duration-200 hover:scale-[1.02] hover:bg-base-300 lg:p-6 space-y-1 lg:space-y-2">
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-2 lg:gap-x-3">
                      <p className="mr-auto font-bold lg:text-lg">{product?.productName}</p>
                      <div className="flex gap-2">
                        <span className="badge badge-primary badge-sm lg:badge-md whitespace-nowrap duration-200">
                          {product?.productStage}
                        </span>
                      </div>
                    </div>
                    <p className="text-base-content/80 text-sm lg:text-base">{product?.productDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="fixed bottom-4 select-none max-lg:right-4 lg:bottom-16 lg:left-16">
        <div className="group flex cursor-pointer items-center gap-1 rounded-lg bg-neutral px-3 py-1.5 text-sm text-neutral-content shadow-lg duration-200 hover:scale-[1.02] hover:shadow-xl">
          <Image
            alt="Indie Page logo"
            src="/company_related/logo.webp"
            width={20}
            height={20}
            className="h-5 w-5 delay-100 duration-150 group-hover:-rotate-6 group-hover:scale-110 group-hover:drop-shadow"
          />
          <div className="font-medium">
            <span className="inline md:hidden">Built w/</span>
            <span className="hidden md:inline">Create your</span> Indie Page
          </div>
        </div>
      </div>
    </main>
  );
}

export default LandingPageTemplate;