import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = {display: visible ? '' : 'none'};
  const hideWhenVisible = {display: visible ? 'none' : ''};

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
})

export default Togglable;