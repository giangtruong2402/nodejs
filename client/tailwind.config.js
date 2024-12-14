/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"], // Adjusted content paths
  theme: {
    fontFamily: {
      main: ["sans-serif", "Arial"],
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "image-main": "url('https://wallpapercave.com/wp/wp5063025.jpg')",
        "image-login":
          "url('http://ngn-mag.com/image/wallpaper/fond-ecran-noel%20(238).jpg')",
      },
      colors: {
        main: "#fb5858",
        th: "#E6E6FA",
        tht: "#4B0082",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            transform: "translateY(40px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "slide-top-sm": {
          "0%": {
            transform: "translateY(8px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-1000px)",
            transform: "translateX(-1000px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "scale-in-center": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(100px);",
            transform: "translateX(100px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-top-sm": "slide-top-sm 0.2s linear both",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-in-center":
          "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
