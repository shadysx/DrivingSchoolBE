import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Theme } from '../constants';

interface TimerProgressBarProps {
    progress: number
}

const TimerProgressBar: React.FC<TimerProgressBarProps> = ({ progress }) => {
  return <MemoizedProgressBar progress={progress} />;
};

// Wrap the ProgressBar with React.memo to optimize rendering
const MemoizedProgressBar: React.FC<any> = React.memo(({ progress }) => (
  <ProgressBar style={styles.progressBar} progress={progress} color={Theme.primary} />
));

const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    borderRadius: 20,
    margin: 10,
  },
});

export default TimerProgressBar;
