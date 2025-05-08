import React, { useState } from "react";
import { Typography, Modal, Box, Backdrop, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";

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
            className="w-full h-auto block object-cover contrast-50  saturate-50 transition duration-300 ease-in-out certificate-img"
            onClick={handleOpen}
          />
        </Box>

        {/* hover overplay */}
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
              color: "white",
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
              variant="h6"
              sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(5px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0",
          padding: "0",
          "& .MuiModal-root": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh",
            m: "0",
            p: "0",
            outline: "none",
            "&-focus": {
              outline: "none",
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.8)",
                transform: "scale(1.1)",
              },
            }}
            size="large"
          >
            {" "}
            <CloseIcon sx={{ fontSize: 24 }}></CloseIcon>{" "}
          </IconButton>
          <img
            src={Img}
            alt="Certificate full view"
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "90vh",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
