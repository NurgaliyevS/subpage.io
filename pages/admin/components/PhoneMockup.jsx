import React from "react";

const PhoneMockup = ({ content, product }) => {
  return (
    <div className="mockup-phone border-neutral w-full">
      <div className="camera"></div>
      <div className="display bg-white">
        <div className="artboard bg-white min-h-screen">
          <div className="flex mt-8 gap-4 items-start justify-start ml-2">
            {content?.showUserIcon && content?.userImage && (
              <span className="relative">
                <img
                  src={content?.userImage}
                  alt={content?.userName}
                  className="w-12 h-12 rounded-full"
                />
              </span>
            )}
            <div className="flex-1">
              <h1 className="mb-1 text-xl font-bold lg:mb-3 lg:text-3xl lg:font-extrabold">
                {content?.userName}
              </h1>
              <div className="flex flex-col gap-1 lg:flex-row lg:gap-4"></div>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4 mt-4 text-center">
              {content?.mainHeadline}
            </h2>
            <p className="mb-6 flex-grow text-center">
              {content?.mainDescription}
            </p>

            {content?.showEmailInput && (
              <div className="mb-2">
                <label
                  htmlFor="email-input"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  {content?.emailInputValue}
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="example@gmail.com"
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
            )}

            {content?.showCTAButton && content?.ctaButtonText && (
              <button className="btn btn-primary w-full">
                {content?.ctaButtonText}
              </button>
            )}
          </div>

          <div
            className={`divider my-0 px-6 ${
              product?.isOpenProduct ? "" : "hidden"
            }`}
          ></div>

          {product?.isOpenProduct && product?.products?.length > 0 && (
            <ul className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
              {product.products.map((item, index) => (
                <li key={index} className="card bg-gray-100 duration-200">
                  <a
                    className="group rounded-box cursor-pointer p-3 duration-200 hover:scale-[1.02] hover:bg-base-300"
                    href={item?.productURL}
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    <span className="flex items-center">
                      <p className="font-bold text-sm flex-grow truncate mr-auto lg:text-lg">
                        {item?.productName}
                      </p>
                      {item?.productStage && (
                        <p className="badge badge-outline text-xs">
                          {item?.productStage}
                        </p>
                      )}
                    </span>
                    {item?.productDescription && (
                      <p className="text-sm lg:text-base">
                        {item?.productDescription}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
