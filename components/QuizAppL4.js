import React, {useState} from 'react';
import {View, Text, TextInput, Image, ScrollView, StyleSheet,  Alert, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: '#fff',
    },
    headerIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    greetingText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingHorizontal: 5,
    },
    inputBox: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    questionContainer: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 250,
    },
    questionTextContainer: {
        backgroundColor: '#1976D2',
        paddingVertical: 10,
    },
    questionText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pickerContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#f9f9f9',
        height: 40,
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const InputBox = ({ label, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.inputBox}
                onChangeText={onChangeText}
                placeholder="Enter your name"
            />
        </View>
    );
};

const Question = ({ imageSource, questionText, options, onAnswerChange }) => {
    return (
        <View style={styles.questionContainer}>
            <Image style={styles.image} source={imageSource} />
            <View style={styles.questionTextContainer}>
                <Text style={styles.questionText}>{questionText}</Text>
            </View>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={onAnswerChange}
                    items={options}
                    placeholder={{ label: "Select an answer", value: null }}
                />
            </View>
        </View>
    );
};

const QuizAppL4 = () => {
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    const correctAnswers = { 1: 'Bee', 2: 'Crocodile', 3: 'Deer', 4: 'Pride', 5: 'Owl' };

    const checkAnswers = () => {
        const unansweredQuestions = Object.values(answers).some(answer => answer === '');
        if (unansweredQuestions) {
            Alert.alert("Please answer all questions before submitting.");
            return;
        }

        let correctCount = 0;
        for (let key in correctAnswers) {
            if (answers[key] === correctAnswers[key]) correctCount++;
        }

        let message;
        if (correctCount === 5) {
            message = "Excellent! You got a perfect score of 5!";
        } else if (correctCount === 4) {
            message = "Great job! You got 4 out of 5 correct!";
        } else if (correctCount === 3) {
            message = "Good effort! You scored 3 out of 5.";
        } else if (correctCount === 2) {
            message = "Not bad! You got 2 correct answers.";
        } else if (correctCount === 1) {
            message = "You got 1 answer right. Keep practicing!";
        } else {
            message = "It looks like you need a bit more practice. Try again!";
        }
        Alert.alert(message);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="frog" size={24} color="#000" style={styles.headerIcon} />
                <Text style={styles.headerText}>Animal Quiz</Text>
            </View>
            <InputBox label="Username:" onChangeText={setUsername} />
            {username ? <Text style={styles.greetingText}>Hello, {username}!</Text> : null}
            <ScrollView>
                <Question
                    imageSource={require('../img/bee.jpg')}
                    questionText="What animal is this?"
                    options={[
                        { label: 'Wasp', value: 'Wasp' },
                        { label: 'Bee', value: 'Bee' },
                        { label: 'Hornet', value: 'Hornet' },
                    ]}
                    onAnswerChange={(value) => setAnswers({ ...answers, 1: value })}
                />

                <Question
                    imageSource={require('../img/crocodile.jpg')}
                    questionText="What animal is this?"
                    options={[
                        { label: 'Alligator', value: 'Alligator' },
                        { label: 'Monitor Lizard', value: 'Monitor Lizard' },
                        { label: 'Crocodile', value: 'Crocodile' },
                    ]}
                    onAnswerChange={(value) => setAnswers({ ...answers, 2: value })}
                />

                <Question
                    imageSource={require('../img/deer.jpg')}
                    questionText="What animal is this?"
                    options={[
                        { label: 'Antelope', value: 'Antelope' },
                        { label: 'Deer', value: 'Deer' },
                        { label: 'Gazelle', value: 'Gazelle' },
                    ]}
                    onAnswerChange={(value) => setAnswers({ ...answers, 3: value })}
                />

                <Question
                    imageSource={require('../img/lion.jpg')}
                    questionText="What animal is this?"
                    options={[
                        { label: 'Pack', value: 'Pack' },
                        { label: 'Pride', value: 'Pride' },
                        { label: 'Herd', value: 'Herd' },
                        { label: 'Flock', value: 'Flock' },
                    ]}
                    onAnswerChange={(value) => setAnswers({ ...answers, 4: value })}
                />

                <Question
                    imageSource={require('../img/questionmark.jpg')}
                    questionText="This nocturnal animal is known for its ability to rotate its head almost 180 degrees and hunts small animals at night. What is it?"
                    options={[
                        { label: 'Owl', value: 'Owl' },
                        { label: 'Eagle', value: 'Eagle' },
                        { label: 'Bat', value: 'Bat' },
                        { label: 'Hawk', value: 'Hawk' },
                    ]}
                    onAnswerChange={(value) => setAnswers({ ...answers, 5: value })}
                />

                <TouchableOpacity style={styles.submitButton} onPress={checkAnswers}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default QuizAppL4;
