import React from "react";
import { Link } from "react-router-dom";

function BandCard({ data }) {
  return (
    <div>
      <div class="flex-shrink-0">
        <img
          class="h-72 w-full object-cover object-top"
          src={data.bannerUrl}
          alt=""
        />
      </div>
      <div class="flex-1 bg-white p-6 flex flex-col justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-indigo-600">
            {data.genre.map((genre, index) => {
              return <a className="mx-1">{genre}</a>;
            })}
          </p>
          <Link to="/profile/1" class="block mt-2">
            <p class="text-xl font-semibold text-gray-900">{data.nama}</p>
          </Link>
          <p class="mt-3 text-base text-gray-500">{data.deskripsi}</p>
        </div>
      </div>
    </div>
  );
}

export default BandCard;
