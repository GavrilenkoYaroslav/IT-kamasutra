import {Scrollbars} from 'react-custom-scrollbars';
import React, {useRef, useState} from "react"
import {Button, Col, Row, Tabs} from "antd"
import styles from "./AvatarGenerator.module.css"
import Avatar, {allOptions, OptionContext} from "avataaars"
import * as ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {savePhoto} from "../../../redux/reducers/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";


const {TabPane} = Tabs;

type PropsType = {
    id: number | null
}

const AvatarGenerator: React.FC<PropsType> = ({id}) => {
    const avatarRef = useRef(null);
    const [selectedStyle, setSelectedStyle] = useState({} as avatarType);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [avatarImageSrc, setAvatarImageSrc] = useState('');
    const theme = useSelector((state: AppStateType) => state.app.theme);
    const dispatch = useDispatch();
    const optionsContext = useRef(new OptionContext(allOptions));
    const tabNames = ['Hair', 'Accessories', 'Hat Color', 'Hair Color',
        'Facial Hair', 'Facial Hair Color', 'Clothes', 'Clothes Color',
        'Clothes Graphic', 'Eyes', 'Eyebrows', 'Mouth', 'Skin Color'];
    const tabs = useRef(Array.from(optionsContext.current.options)
        .map((option: any, index) => {
            return {
                key: option.key,
                label: tabNames[index]
            }
        }));

    type avatarType = {
        avatarStyle?: string
        topType?: string
        accessoriesType?: string
        hatColor?: string
        hairColor?: string
        facialHairType?: string
        facialHairColor?: string
        clotheType?: string
        clotheColor?: string
        eyeType?: string
        eyebrowType?: string
        mouthType?: string
        skinColor?: string
        graphicType?: string
    }
    const defaultAvatar = {
        avatarStyle: 'Transparent',
        accessoriesType: 'Blank',
        topType: 'NoHair',
        hairColor: 'Auburn',
        facialHairType: 'Blank',
        clotheType: 'ShirtScoopNeck',
        clotheColor: 'Gray01',
        eyeType: 'Default',
        eyebrowType: 'Default',
        mouthType: 'Default',
        skinColor: 'Brown'
    };

    const currentAvatar = {...defaultAvatar, ...selectedStyle};

    type avatarStylesType = typeof avatarStyles;
    const avatarStyles = {
        topType: [
            "NoHair",
            "Eyepatch",
            "Hat",
            "Hijab",
            "Turban",
            "WinterHat1",
            "WinterHat2",
            "WinterHat3",
            "WinterHat4",
            "LongHairBigHair",
            "LongHairBob",
            "LongHairBun",
            "LongHairCurly",
            "LongHairCurvy",
            "LongHairDreads",
            "LongHairFrida",
            "LongHairFro",
            "LongHairFroBand",
            "LongHairNotTooLong",
            "LongHairShavedSides",
            "LongHairMiaWallace",
            "LongHairStraight",
            "LongHairStraight2",
            "LongHairStraightStrand",
            "ShortHairDreads01",
            "ShortHairDreads02",
            "ShortHairFrizzle",
            "ShortHairShaggyMullet",
            "ShortHairShortCurly",
            "ShortHairShortFlat",
            "ShortHairShortRound",
            "ShortHairShortWaved",
            "ShortHairSides",
            "ShortHairTheCaesar",
            "ShortHairTheCaesarSidePart"
        ],
        accessoriesType: [
            "Blank",
            "Kurt",
            "Prescription01",
            "Prescription02",
            "Round",
            "Sunglasses",
            "Wayfarers"
        ],
        hatColor: [
            "Black",
            "Blue01",
            "Blue02",
            "Blue03",
            "Gray01",
            "Gray02",
            "Heather",
            "PastelBlue",
            "PastelGreen",
            "PastelOrange",
            "PastelRed",
            "PastelYellow",
            "Pink",
            "Red",
            "White"
        ],
        hairColor: [
            "Auburn",
            "Black",
            "Blonde",
            "BlondeGolden",
            "Brown",
            "BrownDark",
            "PastelPink",
            "Platinum",
            "Red",
            "SilverGray"
        ],
        facialHairType: [
            "Blank",
            "BeardMedium",
            "BeardLight",
            "BeardMajestic",
            "MoustacheFancy",
            "MoustacheMagnum"
        ],
        facialHairColor: [
            "Auburn",
            "Black",
            "Blonde",
            "BlondeGolden",
            "Brown",
            "BrownDark",
            "Platinum",
            "Red"
        ],
        clotheType: [
            "BlazerShirt",
            "BlazerSweater",
            "CollarSweater",
            "GraphicShirt",
            "Hoodie",
            "Overall",
            "ShirtCrewNeck",
            "ShirtScoopNeck",
            "ShirtVNeck"
        ],
        clotheColor: [
            "Black",
            "Blue01",
            "Blue02",
            "Blue03",
            "Gray01",
            "Gray02",
            "Heather",
            "PastelBlue",
            "PastelGreen",
            "PastelOrange",
            "PastelRed",
            "PastelYellow",
            "Pink",
            "Red",
            "White"
        ],
        eyeType: [
            "Close",
            "Cry",
            "Default",
            "Dizzy",
            "EyeRoll",
            "Happy",
            "Hearts",
            "Side",
            "Squint",
            "Surprised",
            "Wink",
            "WinkWacky"
        ],
        eyebrowType: [
            "Angry",
            "AngryNatural",
            "Default",
            "DefaultNatural",
            "FlatNatural",
            "RaisedExcited",
            "RaisedExcitedNatural",
            "SadConcerned",
            "SadConcernedNatural",
            "UnibrowNatural",
            "UpDown",
            "UpDownNatural"
        ],
        mouthType: [
            "Concerned",
            "Default",
            "Disbelief",
            "Eating",
            "Grimace",
            "Sad",
            "ScreamOpen",
            "Serious",
            "Smile",
            "Tongue",
            "Twinkle",
            "Vomit"
        ],
        skinColor: [
            "Tanned",
            "Yellow",
            "Pale",
            "Light",
            "Brown",
            "DarkBrown",
            "Black"
        ],
        graphicType: [
            "Bat",
            "Cumbia",
            "Deer",
            "Diamond",
            "Hola",
            "Pizza",
            "Resist",
            "Selena",
            "Bear",
            "SkullOutline",
            "Skull"
        ],
    };


    const selectFromKeys = (OptionKey: any) => {
        for (let key in avatarStyles) {
            if (OptionKey === key) {
                // @ts-ignore
                return avatarStyles[key];
            }
        }
    };

    // const dataURLtoFile = (dataurl: string, filename: string) => {
    //
    //     let arr = dataurl.split(',');
    //     // @ts-ignore
    //     let mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]),
    //         n = bstr.length,
    //         u8arr = new Uint8Array(n);
    //
    //     while(n--){
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //
    //     return new File([u8arr], filename, {type:mime});
    // }

    const avatarSaveHandler = () => {

        if (!Object.keys(selectedStyle).length) return;

        setLoading(true);

        // @ts-ignore
        const svgString = new XMLSerializer().serializeToString(ReactDOM.findDOMNode(avatarRef.current));
        // const canvas = document.createElement("canvas");
        // // @ts-ignore
        // canvas.height = Number(ReactDOM.findDOMNode(avatarRef.current).getAttribute('height').slice(0, -2));
        // // @ts-ignore
        // canvas.width = Number(ReactDOM.findDOMNode(avatarRef.current).getAttribute('width').slice(0, -2));
        // const ctx = canvas.getContext("2d");
        // const DOMURL = window.URL || window.webkitURL || window;
        // const img = new Image();
        const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

        const file = new File([svg], "avatar.png", {type: 'image/png'});
        dispatch(savePhoto(file));

        // const url = DOMURL.createObjectURL(svg);
        // img.onload = function () {
        //     ctx?.drawImage(img, 0, 0);
        //     let png = canvas.toDataURL("image/jpeg");
        //     // const file = new File([png], 'avatar.png');
        //     // debugger
        //     // dispatch(savePhoto(file));
        //     // const file = dataURLtoFile(png, 'avatar.png');
        //     fetch(png)
        //         .then(res => res.blob())
        //         .then(blob => {
        //             const file = new File([blob], "avatar.jpeg");
        //             debugger
        //             dispatch(savePhoto(file));
        //         })
        //
        //     DOMURL.revokeObjectURL(png);
        // };
        // img.src = url;

        setLoading(false);
    };

    const selectItem = (index: any, property: any) => {
        setSelectedIndex(index);
        setSelectedStyle({...selectedStyle, ...property});
    }

    const removeAvatar = () => {
        setSelectedIndex(null);
        setSelectedStyle({});
    }

    // @ts-ignore
    const hairColorDisabled = selectedStyle.topType && ['Hat', "LongHairFrida", "LongHairShavedSides", 'WinterHat1', 'WinterHat2', 'WinterHat3',
        'WinterHat4', 'NoHair', 'Eyepatch', 'Turban', 'Hijab'].includes(selectedStyle.topType);
    const hatColorDisabled = !selectedStyle.topType || !(['WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'Turban', 'Hijab'].includes(selectedStyle.topType));
    const facialHairDisabled = 'Hijab' === selectedStyle.topType;
    const facialHairColorDisabled = facialHairDisabled || !selectedStyle.facialHairType || !(["BeardMedium", "BeardLight", "BeardMajestic",
        "MoustacheFancy", "MoustacheMagnum"].includes(selectedStyle.facialHairType));
    const accessoriesDisabled = 'Eyepatch' === selectedStyle.topType;
    const clothesColorDisabled = selectedStyle.clotheType && ["BlazerShirt", "BlazerSweater"].includes(selectedStyle.clotheType);
    const graphicDisabled = !("GraphicShirt" === selectedStyle.clotheType);

    return (
        <Row gutter={10} justify="center" style={{height: 765}} className={styles.avatarGenerator}>
            <Col className={styles.presentationCol} xs={22} sm={18} md={8}>
                <div className={`${styles.avatarPresentation} ${theme ? 'dark' : ''}`}>
                    <h2>Create your own Avatar</h2>
                    <div className={styles.avatarFull}>
                        <Avatar ref={avatarRef} {...currentAvatar} avatarStyle={'Circle'}
                                style={{width: '305px', height: '324px'}}/>
                    </div>

                    <div className={styles.avatarControl}>
                        <Button
                            disabled={!Boolean(id && Object.keys(selectedStyle).length)}
                            loading={loading}
                            onClick={avatarSaveHandler}
                            htmlType="submit"
                            type="primary">
                            Set as profile picture!
                        </Button>
                        <Button type="primary" onClick={removeAvatar}>
                            Remove Avatar
                        </Button>
                    </div>
                </div>
            </Col>
            <Col className="gutter-row" xs={22} sm={16} md={16}>
                <div className={`${styles.avatarGeneration} ${theme ? 'dark' : ''}`}>
                    <Tabs tabBarGutter={0} className={styles.tabs} defaultActiveKey="topType" style={{height: '100%'}}
                          animated={true} >
                        {tabs.current.map(tab => {

                            const disabledTabs = (graphicDisabled && tab.key === 'graphicType') ||
                                (clothesColorDisabled && tab.key === 'clotheColor') || (accessoriesDisabled && tab.key === 'accessoriesType') ||
                                (facialHairColorDisabled && tab.key === 'facialHairColor') || (hairColorDisabled && tab.key === 'hairColor') ||
                                (hatColorDisabled && tab.key === 'hatColor') || (facialHairDisabled && tab.key === 'facialHairType');

                            return (

                                <TabPane disabled={disabledTabs} tab={tab.label} key={tab.key}>
                                    <Scrollbars
                                        autoHeight
                                        autoHeightMax={640}
                                        className="scrollbar"
                                        renderTrackHorizontal={(props :any) => <div {...props} className="track-horizontal"
                                                                             style={{display: "none"}}/>}
                                        renderThumbHorizontal={(props :any) => <div {...props} className="thumb-horizontal"
                                                                             style={{display: "none"}}/>}
                                        hideTracksWhenNotNeeded={true}>
                                        <Row style={{height: "100%"}}>
                                            {
                                                selectFromKeys(tab.key).map((item:any, index:any) => (
                                                    <Col xs={24}
                                                         sm={12}
                                                         md={8}
                                                         lg={6} style={{height: '30%'}} key={index}>
                                                        <div onClick={() => selectItem(index, {[tab.key]: item})}
                                                             className={[styles.avatarSelect, index === selectedIndex ? styles.selected : ''].join(' ')}>
                                                            <Avatar {...{...currentAvatar, [tab.key]: item}}
                                                                    style={{height: '100%'}}/>
                                                        </div>
                                                    </Col>
                                                ))}
                                        </Row>
                                    </Scrollbars>
                                </TabPane>
                            )
                        })}

                    </Tabs>
                </div>
            </Col>
        </Row>
    )
}

export default AvatarGenerator