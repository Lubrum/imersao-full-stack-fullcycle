import Grid2 from "@mui/material/Grid";
import { PropsWithChildren } from "react";
import { Card } from "./Card";
import { Button, SxProps, Theme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";

export type CardActionProps = {
  sx?: SxProps<Theme>;
  action?: (formData: FormData) => void;
};

export function CardAction(props: PropsWithChildren<CardActionProps>) {
  return (
    <Card>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6}} sx={props.sx}>
          {props.children}
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 6}}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <form action={props.action}>
            <Button color="primary" type="submit">
              <ArrowForwardIcon />
            </Button>
          </form>
        </Grid2>
      </Grid2>
    </Card>
  );
}
