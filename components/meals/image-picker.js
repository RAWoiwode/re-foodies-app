"use client";
import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const imageRef = useRef();
  const [imageSelect, setImageSelect] = useState();

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setImageSelect(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageSelect(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!imageSelect && <p>No image selected</p>}
          {imageSelect && (
            <Image src={imageSelect} alt="selected image" fill sizes="10vw" />
          )}
        </div>
        <input
          className={styles.input}
          ref={imageRef}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button className={styles.button} type="button" onClick={handleClick}>
          Pick an image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
