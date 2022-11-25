import { Box, Grid, Image, Stack, Title } from "@mantine/core";
import { Layout } from "components/layout";
import { imagesCreditsLinks } from "helpers/imagesCreditsLinks";
import React from "react";
import creditsStyles from "styles/componentsStyles/credits.module.scss";

const credits = () => {
  return (
    <Layout>
      <Stack align="center">
        <Title order={2} mb="lg">
          Free content attributes
        </Title>
        <Grid className={creditsStyles.grid}>
          {imagesCreditsLinks.map((link) => (
            <>
              <Grid.Col span={2}>
                <Box className={creditsStyles.imageCell}>
                  <Image fill src={link.image} alt={link.title} sizes="25vw" />
                </Box>
              </Grid.Col>
              <Grid.Col span={10}>
                <Box className={creditsStyles.linkCell}>
                  <a
                    href={link.href}
                    title={link.title}
                    className="classic"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.text}
                  </a>
                </Box>
              </Grid.Col>
            </>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default credits;
