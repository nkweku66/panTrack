import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Dialog, DialogContent, Button } from '@mui/material';

const CameraCapture = ({ open, onClose, onCapture }) => {
    const webcamRef = useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
        onClose();
    }, [webcamRef, onCapture, onClose]);

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    overflow: 'hidden',
                },
            }}
        >
            <DialogContent
                sx={{
                    backgroundColor: '#1a262d',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '300px',
                    height: '300px',
                    padding: "20px 0"
                }}
            >
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                />
                <Button 
                    onClick={capture}
                    sx={{
                        backgroundColor: "#39db7d",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "10px",
                        margin: "20px 0",
                        fontSize: "16px",
                        fontFamily: "inherit",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#1c9c52"
                        }
                    }}
                >
                    Capture
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CameraCapture;