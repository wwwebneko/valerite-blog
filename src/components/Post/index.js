import React from "react";
import { timeStampToDate } from "../../actions/date";
import styles from './index.module.scss';

export default function Post({created, content, tags }) {
  return (
    <article className={ styles.article }>
      {content.map((paragraph, i) => <p key={`${i}-${created}`}>{paragraph}</p>)}
      <footer>
        <small>{timeStampToDate(created)}</small>
        <br/>
        <small>
          {tags.map((tag, i) => <button key={`${i}-${created}`}>{ tag }</button>)}
        </small>
      </footer>
    </article>
  )
}