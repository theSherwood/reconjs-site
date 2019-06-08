import React from "react";
import Link from "next/link";

export default () => (
  <ul>
    <li>
      <Link href="/about" as="/about">
        <a>about</a>
      </Link>
    </li>
    <li>
      {/* This doesn't work for some reason */}
      <Link href="/demo" as="/demo">
        {/* <a href="/demo">demo</a> */}
        <a>demo</a>
      </Link>
    </li>
    {/* <li>
      <Link href={{ pathname: '/posts', query: { id: '2' } }} as='/posts/2'>
        <a>post #2</a>
      </Link>
    </li> */}
  </ul>
);
