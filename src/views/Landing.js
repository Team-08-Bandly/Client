import React from "react";

import BandCard from "../components/bandCard";

import {
  Link
} from 'react-router-dom'

function Landing() {



  const listBand = [
    {
      nama: "Nirvana",
      genre: [ "Grunge" ],
      jenis: "Band",
      deskripsi: "Nirvana adalah nama sebuah grup band dari Kota Aberdeen, Washington, Amerika Serikat, kemudian akhirnya mereka mendapatkan kesuksesan di Kota Seattle, Amerika Serikat, yang terkenal dengan aliran musik grunge, atau yang dikenal juga dengan Seattle Sound",
      rate: 1000000,
      bannerUrl: "https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg"
    },
    {
      nama: "Michael Learns To Rock",
      genre: [ "Sweet Pop", "Soft Rock" ],
      jenis: "Band",
      deskripsi: "Michael Learns to Rock, sering disingkat MLTR, adalah grup musik sweet pop / soft rock Denmark. Grup musik ini didirikan pada 21 Maret 1988 oleh penyanyi dan pemain kibor Jascha Richter, drummer Kåre Wanscher, gitaris Mikkel Lentz serta pemain bas dan gitar Søren Madsen.",
      rate: 10000000,
      bannerUrl: "https://fanart.tv/api/download.php?type=download&image=89695&section=2"
    },
    {
      nama: "Queen",
      genre: [ "Rock" ],
      jenis: "Band",
      deskripsi: "Queen adalah grup musik rok dari Britania Raya yang dibentuk tahun 1970 di London. Semula, mereka terdiri dari Freddie Mercury, Brian May, Roger Taylor, dan John Deacon.",
      rate: 10000000,
      bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Queen_%E2%80%93_montagem_%E2%80%93_new.png"
    },
    {
      nama: "Michael Jackson",
      genre: [ "Pop","Soul","R&B","Funk" ],
      jenis: "Soloist",
      deskripsi: " Ia terkenal sebagai the `King of Pop` dan memopulerkan gerakan dansa `Moonwalk` yang telah menjadi ciri khasnya. Albumnya yang dirilis pada tahun 1982, Thriller, adalah album terlaris di dunia, dengan penjualan melebihi 104 juta kopi di seluruh dunia.",
      rate: 10000000,
      bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg"
    },
    {
      nama: "Elvis Presley",
      genre: [ "Rock","Rock & Roll","R&B","Funk" ],
      jenis: "Soloist",
      deskripsi: 'Elvis Aaron Presley adalah seorang penyanyi sekaligus penulis lagu dan pemeran Amerika. Dianggap sebagai salah satu ikon kebudayaan paling berpengaruh pada abad ke-20, ia sering disebut dengan sebutan "King of Rock and Roll" atau singkatnya "the King".',
      rate: 10000000,
      bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/1280px-Elvis_Presley_promoting_Jailhouse_Rock.jpg"
    },
    {
      nama: "John Lennon",
      genre: [ "Rock","Pop","Experimental" ],
      jenis: "Soloist",
      deskripsi: 'John Winston Ono Lennon, MBE paling dikenal sebagai penyanyi, pencipta lagu, instrumentalis, penulis, dan aktivis politik yang terkenal di seluruh dunia sebagai pemimpin dari The Beatles. Lennon dan Paul McCartney membentuk partnership pencipta lagu yang paling sukses dan berhasil hingga saat ini.',
      rate: 10000000,
      bannerUrl: "http://t2.gstatic.com/images?q=tbn:ANd9GcQr-dMu5bGhzbE_bG3-UkQZrS-aL_Hy8PU_glZdL43IkFXGaJo63bftnQwiWzcD"
    }
  ]

  return (
    <div className="relative overflow-hidden pb-8">
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">You can</span>
            <span className="block text-indigo-600 xl:inline">
              &nbsp;Perform Anywhere
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            You can find your dream performance, if you are performer. <br />
            Or you can find your dream performer, if you are event organizer.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
            <Link to="/">
              <span
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Browse Performer
              </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="mx-auto container mt-32">
        <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          { listBand.map((band,index) => {
            return (
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <BandCard data={band}/>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  );
}

export default Landing;
