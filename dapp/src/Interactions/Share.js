import React from "react";

const Share = ({ userAccount }) => {
  const handleShare = () => {

    const tweetText = "Hey, my $MONAD address is ${userAccount} and I voted on $YESNO and question in my mind was:";
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    window.open(twitterUrl, "_blank");
  };

  return (
    <button className="button_light" onClick={handleShare}>
      Share at x.com now!
    </button>
  );
};

export default Share;