import React from "react";

const Share = () => {
  const handleShare = () => {
    // Pre-filled tweet text
    const tweetText = "#askmyself I voted on $YESNO and question in my mind was: ... ";

    // Twitter Web Intent URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    // Open the URL in a new tab
    window.open(twitterUrl, "_blank");
  };

  return (
    <button className="button_light" onClick={handleShare}>
      Share at x.com now!
    </button>
  );
};

export default Share;