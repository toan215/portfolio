import React, { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import { FullscreenIcon } from "@mui/icons-material/Fullscreen";

const Certificate = ({ Img }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
            "& .overlay": {
              opacity: 1,
            },
            "& .hover-content": {
              opacity: 1,
              transform: "translate(-50%, -50%)",
            },
            "& . certificate-img": {
              filter: "contrast(1.05) brightness(1) saturate(1.1)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            "& ::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              zIndex: 1,
            },
          }}
        >
          <img
            src={Img}
            alt="Certificate"
            className="w-full h-auto block object-cover contrast-50 brightness-50 saturate-50 transition duration-300 ease-in-out certificate-img"
            onClick={handleOpen}
          />
        </Box>
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            transition: "all",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={handleOpen}
        >
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "black",
              zIndex: 3,
            }}
          >
            <FullscreenIcon
              sx={{
                fontSize: 40,
                mb: 1,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
            <Typography
              sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Certificate;
