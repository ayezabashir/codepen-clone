import SplitPane from "react-split-pane";

const NewProject = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* Alert section */}

        {/* header sections */}

        {/* coding sections */}
        <div>
          {/* horizontal */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* top coding section */}
            <SplitPane split="vertical" minSize={500}>
              {/* html code */}
              <SplitPane split="vertical" minSize={500}>
                {/* css code */}

                {/* js code */}
              </SplitPane>
            </SplitPane>

            {/* bottom result section */}
            <div></div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
