import { useState, useEffect, useMemo } from "react";
import { ProgressBar } from "react-native-paper";
import { Theme } from "../constants";
import { StyleSheet } from "react-native";
import React from "react";

export const TimerProgressBar: React.FC<any> = ({ definedTimer, questionCounter , handleTimeOut }) => {
    const [timeLeft, setTimeLeft] = useState<number>(definedTimer);
  
    useEffect(() => {
        //
      })
  
    useEffect(() => {
        if (timeLeft === -1) {
            handleTimeOut();
            return;
        }

        console.log(timeLeft)
  
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
  
        return () => clearInterval(timer);
    }, [timeLeft]);
  
    useEffect(() => {
        // Reset the timer if question counter increase
        setTimeLeft(definedTimer);
    }, [questionCounter]);
  
    return (
      <ProgressBar
        progress={timeLeft / definedTimer}
        style={styles.progressBar}
        color={Theme.primary}
      />
    );
  };

  const styles = StyleSheet.create({
    progressionContainer: {},
    progressBar: {
      // marginLeft: 20,
      // marginRight: 20,
      height: 10,
      borderRadius: 20,
      margin: 10,
    },
  })