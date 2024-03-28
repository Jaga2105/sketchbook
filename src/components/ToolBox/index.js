import { COLORS, MENU_ITEMS } from "@/constants";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeBrushSize, changeColor } from "@/store/reducers/toolboxSlice";
import { useState } from "react";

const toolboxColors = [
  COLORS.BLACK,
  COLORS.RED,
  COLORS.GREEN,
  COLORS.BLUE,
  COLORS.ORANGE,
  COLORS.YELLOW,
];
const ToolBox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeTooltip = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushTooltip =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  console.log(color, size);
  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };
  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };
  return (
    <div className={styles.toolbarContainer}>
      {showStrokeTooltip && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          {/* <div className={styles.itemContainer}>
            <div
              className={`${styles.colorBox}`}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updateColor(COLORS.BLACK)}
            />
            <div
              className={`${styles.colorBox}`}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updateColor(COLORS.RED)}
            />
            <div
              className={`${styles.colorBox}`}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => updateColor(COLORS.GREEN)}
            />
            <div
              className={`${styles.colorBox}`}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updateColor(COLORS.BLUE)}
            />
            <div
              className={`${styles.colorBox}`}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updateColor(COLORS.ORANGE)}
            />
            <div
              className={`${styles.colorBox}`}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updateColor(COLORS.YELLOW)}
            />
          </div> */}
          <div className={styles.itemContainer}>
            {toolboxColors.map((colr) => (
              <div
                key={colr}
                className={`${styles.colorBox} ${colr===color ? styles.active : ""}`}
                style={{ backgroundColor: colr }}
                onClick={() => updateColor(colr)}
              />
            ))}
          </div>
        </div>
      )}

      {showBrushTooltip && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              className="w-full"
              onChange={updateBrushSize}
              value={size}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ToolBox;
