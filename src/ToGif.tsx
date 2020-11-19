import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import LoadingSpinner from "./components/LoadingSpinner";
import {TextField} from "@material-ui/core";
import SelectInput from "@material-ui/core/Select/SelectInput";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "./ToGif.css";

const ffmpeg = createFFmpeg({log: true});

function Gif() {
    const [ready, setReady] = useState(false);
    const [video, setVideo]: any | null | undefined = useState();
    const [gif, setGif]: any | undefined | null = useState();
    const [progress, setProgress]: any | undefined | null = useState();
    const [conversionInQueue, setConversionInQueue]: any | undefined | null = useState(false);

    const load = async () => {
        try {
            if (!ffmpeg.isLoaded()) {
                await ffmpeg.load();
            }
        } catch (e) {
            alert('Your browser may not support SharedArrayBuffer.  Please use latest version of Chromium or any other browser supports SharedArrayBuffer.')
        }
        setReady(true);
    }
    useEffect(() => {
        load();
    }, []);

    const [offsetFromStart, setOffsetFromStart] = useState(0);
    const [gifDuration, setGifDuration] = useState(3);
    
    const convertToGif = async (delay: number, duration: number) => {
        setConversionInQueue(true);
        
        // Writes file to WASM memory
        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

        ffmpeg.setProgress((e) => {
            setProgress(Math.floor(e.ratio * 100), 3);
        });
        
        setProgress(0);
        // Run FFMPEG command
        await ffmpeg.run('-i', 'test.mp4', '-t', String(duration), '-ss', String(delay), '-f', 'gif', 'out.gif');
        
        // Read result
        const data = ffmpeg.FS('readFile', 'out.gif');

        // Create the url s
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

        setConversionInQueue(false);
        
        setGif(url);
        setProgress(null);
    }

    return ready ? (
            <div className="App">
                <h1>Convert Video to .GIF Image</h1>
                <form className="gif__form" noValidate autoComplete="off">
                    <Button className="gif__form-element" component="label">
                        Upload File
                        <input hidden type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
                    </Button>
                    <TextField className="gif__form-element" type="number" id="outlined-basic" label="Offset from Start (sec)" variant="outlined"
                               onChange={(e) => (
                                   setGifDuration(parseInt(e.target?.value))
                               )}
                    />
                    <TextField className="gif__form-element" type="number" id="outlined-basic" label="GIF Duration (sec)" variant="outlined"
                               onChange={(e) => (
                                   setOffsetFromStart(parseInt(e.target?.value))
                                   )}
                    />
                    <Button className="gif__form-element" disabled={!video || conversionInQueue} onClick={() => convertToGif(offsetFromStart, gifDuration)}>Convert</Button>
                    
                    {progress && <p>{progress}%</p>}
                    <div className="gif__input-output">
                        {video && <div><p>Input</p><video
                            controls
                            width="250"
                            src={URL.createObjectURL(video)}>
                        </video></div>}

                        { gif && <div><p>Output</p><img src={gif} width="250"  alt=""/></div>}
                    </div>

                </form>

            </div>
    ) : (<LoadingSpinner />);
}

export default Gif;
