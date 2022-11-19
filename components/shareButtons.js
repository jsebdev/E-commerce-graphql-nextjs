import { Group } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import shareButtonsStyles from "styles/componentsStyles/shareButtons.module.scss";

export const ShareButtons = ({ noWrap = "wrap" }) => {
  const router = useRouter();
  const domain = "https://www.djangoEcommerce.com";
  // useEffect(() => {
  //   console.log("the router", router);
  //   // debugger;
  // }, [router]);

  return (
    <Group spacing="xs" noWrap={noWrap} align="center">
      <FacebookShareButton
        url={`${domain}${router.asPath}`}
        className={shareButtonsStyles.button}
      >
        <FacebookIcon round={true} size={30} />
      </FacebookShareButton>
      <TwitterShareButton
        url={`${domain}${router.asPath}`}
        className={shareButtonsStyles.button}
      >
        <TwitterIcon round={true} size={30} />
      </TwitterShareButton>
      <WhatsappShareButton
        url={`${domain}${router.asPath}`}
        className={shareButtonsStyles.button}
      >
        <WhatsappIcon round={true} size={30} />
      </WhatsappShareButton>
      <TelegramShareButton
        url={`${domain}${router.asPath}`}
        className={shareButtonsStyles.button}
      >
        <TelegramIcon round={true} size={30} />
      </TelegramShareButton>
    </Group>
  );
};
