import AnimatedButton from "../Buttons/AnimatedButton";

export default ({ handleSubmit, showModal, toggleScreens }) => (
  <div className="console-wrapper">
    <div className="console">
      {/*Vector Illustration by <a href="https://vecteezy.com">www.Vecteezy.com</a>*/}
      <AnimatedButton
        onClick={handleSubmit}
        size="64"
        title="Submit (Ctrl-Enter)"
      />
      <AnimatedButton
        onClick={toggleScreens}
        size="64"
        selected={!!(showModal % 3)}
        title="Toggle Screens (Ctrl-Space)"
      />
    </div>
    <style jsx>{`
      .console-wrapper {
        perspective: 1000px;
      }

      .console {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        padding: 15px 0px;
        border: solid 1px black;
        transform-style: preserve-3d;
        transform: rotateX(15deg);
        perspective: 1000px;
        width: 95%;
        margin: 0 auto;
        background-color: rgb(27, 27, 27);
        background-image: radial-gradient(
          circle,
          rgba(37, 37, 37, 1) 4%,
          rgba(0, 0, 0, 1) 100%
        );
      }

      @media only screen and (max-width: 600px) {
        .console {
          padding: 10px 0px;
        }
      }

      @media only screen and (max-width: 500px) {
        .console {
          padding: 5px 0px;
        }
      }
    `}</style>
  </div>
);
