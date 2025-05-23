import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useReducer, useEffect } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            }
        default:
            return state;
    }
};

export default function Input(props) {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false,
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id])

    const textChangeHandler = text => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(props.required && text.trim().length === 0){
            isValid = false;
        }

        if(props.email && !emailRegex.test(text.toLowerCase())){
            isValid = false;
        }

        if(props.min != null && +text < props.min){
            isValid = false;
        }

        if(props.max != null && +text > props.max){
            isValid = false;
        }

        if(props.minLength != null && text.length < props.minLength){
            isValid = false;
        }

        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }

    return (
        <View style={styles.innerContainer}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 14,
    },
});
