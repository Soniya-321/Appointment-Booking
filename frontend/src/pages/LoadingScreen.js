import { Box } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </Box>
      <style>
        {`
          .loading-dots {
            display: flex;
            gap: 8px;
          }
          .loading-dots span {
            width: 12px;
            height: 12px;
            background: #007bff;
            border-radius: 50%;
            opacity: 0;
            animation: fade 1.5s infinite ease-in-out;
          }
          .loading-dots span:nth-child(1) { animation-delay: 0s; }
          .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
          .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes fade {
            0%, 100% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingScreen;
