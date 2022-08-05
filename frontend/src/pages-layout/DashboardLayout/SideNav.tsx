import {
  createStyles,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { FC } from "react";
import { useGetChannelsQuery } from "src/lib/channel";
import { getPath } from "src/lib/const";
import { ActiveLink } from "src/lib/next";
import { ArrowLeft, ArrowRight, DeviceAnalytics } from "tabler-icons-react";

const useStyles = createStyles<string, { collapsed?: boolean }>(
  (theme, params, getRef) => {
    const icon: string = getRef("icon");

    return {
      navbar: {
        position: "sticky",
        top: 0,
        width: params?.collapsed ? 81 : 264,
        transition: params?.collapsed ? "width 0.1s linear" : "none",
      },

      header: {
        paddingBottom: theme.spacing.xs,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      },

      footer: {
        paddingTop: theme.spacing.xs,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      },

      logo: {
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing.sm,
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        fontWeight: 700,
      },

      link: {
        ...theme.fn.focusStyles(),
        width: "100%",
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing.sm,
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
          backgroundColor: theme.colors.gray[0],
          color: theme.black,

          [`& .${icon}`]: {
            color: theme.black,
          },
        },
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.colors[theme.primaryColor][0],
          color: theme.colors[theme.primaryColor][7],
          [`& .${icon}`]: {
            color: theme.colors[theme.primaryColor][7],
          },
        },
      },

      linkIcon: {
        ref: icon,
        color: theme.colors.gray[6],
        textAlign: "center",
        margin: params?.collapsed ? "0 auto" : "0",
      },

      linkLabel: params?.collapsed ? { display: "none" } : {},
    };
  }
);

/** @package */
export const SideNav: FC<{ className?: string }> = ({ className }) => {
  const [collapsed, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles({ collapsed });
  const items = useGetChannelsQuery();

  return (
    <Navbar p="md" className={cx(classes.navbar, className)}>
      <Navbar.Section mb="md">
        {
          <Group className={classes.header} position="apart">
            <div className={classes.logo}>
              <DeviceAnalytics />
              <span className={classes.linkLabel}>UTTC Hackathon</span>
            </div>
          </Group>
        }
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea}>
        {items.data &&
          items.data.map(({ id, name }, index) => {
            return (
              <Tooltip
                key={id}
                label={name}
                disabled={!collapsed}
                position="right"
                withArrow
                sx={{ width: "100%" }}
              >
                <ActiveLink href={getPath("CHANNEL", String(id))} passHref>
                  {(isActive) => {
                    return (
                      <a
                        className={cx(classes.link, {
                          [classes.linkActive]: isActive,
                        })}
                      >
                        <span className={classes.linkIcon}>#{index}</span>
                        <span className={classes.linkLabel}>{name}</span>
                      </a>
                    );
                  }}
                </ActiveLink>
              </Tooltip>
            );
          })}
      </Navbar.Section>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section className={classes.footer}>
          <UnstyledButton className={classes.link} onClick={handlers.toggle}>
            {collapsed ? (
              <ArrowRight className={classes.linkIcon} />
            ) : (
              <>
                <ArrowLeft className={classes.linkIcon} />
                <span>折りたたむ</span>
              </>
            )}
          </UnstyledButton>
        </Navbar.Section>
      </MediaQuery>
    </Navbar>
  );
};
