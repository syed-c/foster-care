import { render, screen } from '@testing-library/react';
import SectionRenderer from '../components/sections/SectionRenderer';

// Mock next/dynamic since it doesn't work in tests
jest.mock('next/dynamic', () => {
  return () => {
    return function MockDynamicComponent(props) {
      return <div data-testid="dynamic-component" {...props} />;
    };
  };
});

describe('SectionRenderer', () => {
  test('renders generic block for unknown section type', () => {
    const section = {
      id: 'unknown-1',
      type: 'unknown',
      title: 'Unknown Section',
      content: 'This is unknown content'
    };

    render(<SectionRenderer section={section} />);
    
    expect(screen.getByText('Unknown Section')).toBeInTheDocument();
    expect(screen.getByText('This is unknown content')).toBeInTheDocument();
  });

  test('renders hero section with correct data', () => {
    const section = {
      id: 'hero-1',
      type: 'hero',
      data: {
        heading: 'Welcome to Our Site',
        subheading: 'Find foster agencies near you',
        cta_primary: {
          text: 'Get Started',
          link: '/contact'
        },
        cta_secondary: {
          text: 'Learn More',
          link: '#learn-more'
        }
      }
    };

    render(<SectionRenderer section={section} />);
    
    // The dynamic component should be rendered
    expect(screen.getByTestId('dynamic-component')).toBeInTheDocument();
  });

  test('uses section key as fallback when type is missing', () => {
    const section = {
      id: 'hero-1',
      key: 'hero',
      data: {
        heading: 'Welcome'
      }
    };

    render(<SectionRenderer section={section} />);
    
    // The dynamic component should be rendered
    expect(screen.getByTestId('dynamic-component')).toBeInTheDocument();
  });

  test('uses section id as key when neither id nor key is provided', () => {
    const section = {
      type: 'hero',
      data: {
        heading: 'Welcome'
      }
    };

    render(<SectionRenderer section={section} />);
    
    // The dynamic component should be rendered
    expect(screen.getByTestId('dynamic-component')).toBeInTheDocument();
  });
});