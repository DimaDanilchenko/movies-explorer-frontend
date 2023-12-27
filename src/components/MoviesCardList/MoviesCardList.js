import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import movie from "../../images/movie1.png";

export default function MoviesCardList() {
  const [movies, setMovies] = useState([
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1704672000&Signature=Yaf30hH8xzT~tlPa6exaCMYEt3U3CRlmRNmqG9psZ9PRx~aSTGRrgXNJAl~7RP5dwQmM9caOBgwko0EWD0R~ZrpBJDkWc5abKHtFkUWQ7lhlSQn6uK9GUYbcmLrvQiQ6c63j-ij8bP~tihWujgsQtsTng7T00Tapa30-SydmJ9Q4JNjZ-1UtJEPkNWD06vCzgCiLEX80Misqys-ZBwH5SzegqJmqAPVNukULrL-hKJvMhqs7H91bfdTMRik6CuwhOSPDuFqR788j5eS34qMs4fBafHnGpx8f99X9QlBBtD9Wn~ISssnm05ztBxypMR2yhLruQ4IYHRfgZbKaS9-SgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },

  ]);

  const moviesElements = movies.map((movie) => (
    <MoviesCard
      movie={movie}
    />
  ))
  return (
    <section className="card-list">{moviesElements}</section>
  )
}
