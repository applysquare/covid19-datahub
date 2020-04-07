import React from "react";

export const ExternalLink = ({ link }) => {
  const url = new URL(link);
  return <a href={link}>
    <span role='img' aria-label='link'>🔗</span>{url.hostname}
  </a>
}