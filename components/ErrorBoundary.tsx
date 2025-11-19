import React, { Component, ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 20, 
          backgroundColor: '#F9FAFB' 
        }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '600', 
            color: '#DC2626', 
            marginBottom: 16 
          }}>
            Something went wrong
          </Text>
          <Text style={{ 
            color: '#6B7280', 
            textAlign: 'center', 
            marginBottom: 24, 
            lineHeight: 24 
          }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity
            style={{ 
              backgroundColor: '#2563EB', 
              paddingHorizontal: 24, 
              paddingVertical: 12, 
              borderRadius: 8 
            }}
            onPress={() => this.setState({ hasError: false, error: undefined })}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}