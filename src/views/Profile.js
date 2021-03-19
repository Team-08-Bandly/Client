import React from "react";
import Badge from "../components/badge";
import PortoCard from "../components/portocard";

function Profile() {
  const band = {
    nama: "Nirvana",
    genre: ["Grunge", "Pop"],
    jenis: "Band",
    deskripsi:
      "Nirvana adalah nama sebuah grup band dari Kota Aberdeen, Washington, Amerika Serikat, kemudian akhirnya mereka mendapatkan kesuksesan di Kota Seattle, Amerika Serikat, yang terkenal dengan aliran musik grunge, atau yang dikenal juga dengan Seattle Sound",
    rate: 1000000,
    bannerUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
  };

  const porto = [
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
    {
      PortofolioType: "image",
      fileUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg",
    },
  ];

  const reviews = [
    {
      id: 1,
    },
    {
      id: 3,
    },
    {
      id: 2,
    },
  ];
  return (
    <div className="relative max-w-7xl mx-auto justify-between px-4 sm:px-6">
      <div className="flex w-full mb-4 rounded h-128">
        <img
          src="https://blog.logmeinrescue.com/wp-content/uploads/2018/11/iStock-944812540-1313x490.jpg"
          className="object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="flex items-start w-full md:w-1/3">
          <div className="bg-white overflow-hidden shadow rounded-lg sticky top-4">
            <div className="px-4 py-5 sm:p-6">
              <div class="aspect-w-32 aspect-h-32">
                <img
                  class="object-cover shadow-lg rounded-lg"
                  src={band.bannerUrl}
                  alt=""
                />
              </div>
              <div class="text-lg leading-6 font-medium mt-8 mb-4">
                <h3>{band.nama}</h3>
              </div>
              <dd class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2 leading-7 mb-4">
                <p>{band.deskripsi}</p>
              </dd>
              {band.genre.map((genre) => {
                return <Badge text={genre} />;
              })}
              <p className="text-sm text-gray-800 mt-4">
                Rate :{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(band.rate)}
              </p>

              <button
                type="button"
                class="w-full justify-center mt-4 inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Make an Appointment
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-start flex-wrap mt-4 md:mt-0 w-full md:w-2/3 md:ml-4 justify-center mx-auto">
          {porto.map((portofolio) => {
            return (
              <div className="md:w-1/3 w-full px-0 md:px-1 mb-4 rounded-lg shadow-lg overflow-hidden">
                <PortoCard />
              </div>
            );
          })}
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-1 border-red-900"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-gray-50 text-lg font-medium text-gray-900">
                Review & Rating
              </span>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg mt-4">
            <div className="px-4 py-4">
              <ul class="divide-y divide-gray-200">
                {reviews.map((review) => {
                  return (
                    <li class="py-4">
                      <div class="flex">
                        <div class="mr-4 flex-shrink-0">
                          <svg
                            class="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 200 200"
                            aria-hidden="true"
                          >
                            <path
                              vector-effect="non-scaling-stroke"
                              stroke-width="1"
                              d="M0 0l200 200M0 200L200 0"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 class="text-lg font-bold">Lorem ipsum</h4>
                          <p class="mt-1">
                            Repudiandae sint consequuntur vel. Amet ut nobis
                            explicabo numquam expedita quia omnis voluptatem.
                            Minus quidem ipsam quia iusto.
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
