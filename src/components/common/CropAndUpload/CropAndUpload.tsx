// import React, {useState, useEffect} from 'react';
// import {useHistory} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux"
// import AuthActions from "services/auth"
// import {NavLink} from "react-router-dom";
// import ReactCrop from "react-image-crop";
// import {Button, Card, Col, Row, Upload} from "antd";
// import styles from "./CSSmodules/UploadProfilePicture.module.css";
// import {Player} from "@lottiefiles/react-lottie-player"
// import 'react-image-crop/dist/ReactCrop.css';
//
// import {blobToFile, getImageUrl} from "utils/methods"
//
// let imageRef;
//
// export const UploadProfilePicture = ({removeSkip}) => {
//     const history = useHistory();
//     const dispatch = useDispatch()
//
//     const {userInfo} = useSelector((state) => state.auth)
//     const UserName = `${userInfo.firstName} ${userInfo.lastName}`
//
//     const [cropOptions, setCropOptions] = useState({
//         cropMode: false,
//         image: null,
//         cropped: null,
//         crop: {
//             unit: '%',
//             width: 30,
//             aspect: 1,
//         }
//     })
//
//     const [profileImage, setProfileImage] = useState(userInfo.profilePhoto ? getImageUrl(userInfo.profilePhoto) : null)
//     const [loading, setLoading] = useState(false)
//
//     let fileUrl;
//
//     const toBase64 = file => new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
//
//     const onUpload = async (file) => {
//         try {
//             const file64 = await toBase64(file);
//             setCropOptions({...cropOptions, cropMode: true, image: file64});
//         } catch (e) {
//             console.error(e)
//         }
//         return false;
//     };
//
//     const onImageLoad = (image) => {
//         imageRef = image;
//     };
//
//
//     const onCropComplete = () => {
//         makeClientCrop(cropOptions.crop);
//     };
//
//     const onCropChange = (crop, percentCrop) => {
//         setCropOptions({...cropOptions, crop: crop})
//     };
//
//     const makeClientCrop = async (crop) => {
//         if (imageRef && crop.width && crop.height) {
//             const croppedImageUrl = await getCroppedImg(
//                 imageRef,
//                 crop,
//                 'newFile.png'
//             );
//
//             let blob = await fetch(croppedImageUrl).then(r => r.blob());
//             const formData = new FormData();
//             formData.append('image', blobToFile(blob, `${userInfo.id}_profilePhoto.png`));
//
//             setLoading(true)
//
//             try {
//                 await dispatch(AuthActions.imageUpload(formData))
//                 setLoading(false)
//                 setProfileImage(croppedImageUrl)
//                 history.push('/')
//             } catch (err) {
//                 setLoading(false)
//             }
//             // need Thunk here to store croppedImageUrl
//             setCropOptions({...cropOptions, crop: crop, cropped: croppedImageUrl});
//             // history.push('/');
//         }
//     }
//
//     const getCroppedImg = (image, crop, fileName) => {
//         const canvas = document.createElement('canvas');
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         canvas.width = Math.ceil(crop.width * scaleX);
//         canvas.height = Math.ceil(crop.height * scaleY);
//         const ctx = canvas.getContext('2d');
//         ctx.beginPath();
//         ctx.arc((crop.width * scaleX) / 2, (crop.height * scaleY) / 2, (crop.width * scaleX) / 2, 0, Math.PI * 2, false);
//         ctx.clip();
//         ctx.stroke();
//         ctx.closePath();
//         ctx.drawImage(
//             image,
//             crop.x * scaleX,
//             crop.y * scaleY,
//             crop.width * scaleX,
//             crop.height * scaleY,
//             0,
//             0,
//             crop.width * scaleX,
//             crop.height * scaleY
//         );
//
//         return new Promise((resolve, reject) => {
//             canvas.toBlob(blob => {
//                 if (!blob) {
//                     console.error('Canvas is empty');
//                     return;
//                 }
//                 blob.name = fileName;
//                 window.URL.revokeObjectURL(fileUrl);
//                 fileUrl = window.URL.createObjectURL(blob);
//                 resolve(fileUrl);
//             }, 'image/png');
//         });
//     };
//
//     return (
//         <Row justify="center" align="middle" style={{height: "100%", width: '100%'}}>
//             <Col xs={{span: 24}}>
//                 <Card bodyStyle={{padding: '10px'}} className={styles.card}>
//                     <div className={styles.container}>
//                         <Row align='middle' justify='center' style={{height: '20%'}}>
//                             <Col span={8}>
//                                 {profileImage ? <img src={profileImage} alt={''} className={styles.avatar}/> :
//                                     <div
//                                         className={styles.avatarNamePlaceholder}>{UserName[0].toLocaleUpperCase()}</div>}
//                             </Col>
//                             <Col span={16}>
//                                 <div className={styles.loginName} style={{textAlign: 'left'}}>{UserName}</div>
//                             </Col>
//                         </Row>
//
//                         <Row style={{height: '80%'}}>
//                             <Col span={24}>
//                                 <div className={styles.uploadLinkButton}>
//                                     {!cropOptions.cropMode &&
//                                     <Upload className={styles.uploaderTop} showUploadList={false}
//                                             beforeUpload={onUpload}>
//                                         {profileImage ? 'UPDATE YOUR PROFILE PICTURE' : 'UPLOAD A PROFILE PICTURE'}
//                                     </Upload>}
//                                     {cropOptions.cropMode && 'CROP YOUR PICTURE'}
//                                 </div>
//                                 {!cropOptions.cropMode ? <div className={styles.profileImageWrapper}>
//                                         {profileImage ? <img src={profileImage} alt={''} className={styles.profileImage}/> :
//                                             <Player
//                                                 autoplay
//                                                 loop
//                                                 hover
//                                                 src="https://assets1.lottiefiles.com/packages/lf20_QYKV0O.json"
//                                                 style={{maxWidth: '235px', marginBottom: 160}}
//                                             />}
//                                     </div>
//                                     :
//                                     <div className={styles.cropWrapper}>
//                                         <ReactCrop
//                                             circularCrop={true}
//                                             src={cropOptions.image}
//                                             crop={cropOptions.crop}
//                                             ruleOfThirds
//                                             onChange={onCropChange}
//                                             onImageLoaded={onImageLoad}
//                                         />
//                                     </div>}
//                                 {!cropOptions.cropMode ?
//                                     <Upload showUploadList={false} className={styles.uploader} beforeUpload={onUpload}>
//                                         <Button className={`primary ${styles.uploadPrimary}`}>Upload</Button>
//                                     </Upload> :
//                                     <Button onClick={onCropComplete}
//                                             className={`primary ${styles.uploadPrimary}`}
//                                             loading={loading}>Save</Button>}
//
//                                 {removeSkip ? <></> : <div className={styles.skip}><NavLink to='/'>Skip</NavLink></div>}
//                             </Col>
//                         </Row>
//
//                     </div>
//                 </Card>
//             </Col>
//         </Row>
//     );
// };

export {};