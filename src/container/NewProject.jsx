import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UserProfileDetails from "../components/UserProfileDetails";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Alert from "../components/Alert";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [isTitle, setIsTitle] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedOutput = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
    `;
    setOutput(combinedOutput);
  };

  const saveCodePen = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };

    await setDoc(doc(db, "Projects", id), _doc)
      .then((res) => {
        setAlert(true);
      })
      .catch((err) => console.log(err));

    setInterval(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* Alert section */}
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
        </AnimatePresence>

        {/* header sections */}
        <header className="w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home"}>
              <img
                src={Logo}
                alt="logo"
                className="object-contain w-64 h-auto"
              />
            </Link>

            <div className="flex flex-col items-start justify-start">
              {/* title */}
              <div className="flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.input
                        key={"TitleInput"}
                        type="text"
                        placeholder="Your Title"
                        className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <motion.p
                        key={"titleLabel"}
                        className="px-3 py-2 text-white text-lg"
                      >
                        {title}
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.div
                        key={"MdCheck"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTitle(false)}
                      >
                        <MdCheck className="text-2xl text-emerald-500" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        key={"MdEdit"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTitle(true)}
                      >
                        <MdEdit className="text-2xl text-primaryText" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* User follow */}
              <div className="flex items-center justify-center px-3 mt-2 gap-2">
                <p className="text-primaryText text-sm">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer "
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>
          {/* User section */}
          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={saveCodePen}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <UserProfileDetails />
            </div>
          )}
        </header>

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
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="text-primaryText font-semibold">HTML</p>
                  </div>
                  {/* icons */}
                  <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    height="600px"
                    theme={"dark"}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                  />
                </div>
              </div>

              <SplitPane split="vertical" minSize={500}>
                {/* css code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaCss3 className="text-xl text-sky-500" />
                      <p className="text-primaryText font-semibold">CSS</p>
                    </div>
                    {/* icons */}
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={css}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }}
                    />
                  </div>
                </div>

                {/* js code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaJs className="text-xl text-yellow-500" />
                      <p className="text-primaryText font-semibold">JS</p>
                    </div>
                    {/* icons */}
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={js}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* bottom result section */}
            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
