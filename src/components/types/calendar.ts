import type { ReactNode } from 'react';

// =============================================================================
// BASE TYPES
// =============================================================================

/**
 * Base date type used across all calendar components
 * Extends native Date for consistency
 */
export type CalendarDate = Date;

/**
 * Calendar theme configuration options
 */
export type CalendarTheme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'custom';

/**
 * Available calendar view types
 */
export type CalendarViewType = 'month' | 'week' | 'day' | 'agenda';

/**
 * Event priority levels for styling
 */
export type EventPriority = 'low' | 'medium' | 'high' | 'critical';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Props for MonthNavigation component
 * Handles month switching and navigation
 */
export interface MonthNavigationProps {
  /** Currently displayed date */
  currentDate: CalendarDate;
  /** Function to update the current date */
  setCurrentDate: (date: CalendarDate) => void;
  /** Optional children for custom content */
  children?: ReactNode;
  /** Optional custom class names */
  className?: string;
  /** Show/hide year navigation */
  showYearNavigation?: boolean;
}

/**
 * Props for MonthGrid component
 * Renders the calendar month view
 */
export interface MonthGridProps {
  /** Date representing the month to display */
  date: CalendarDate;
  /** Custom render function for day cells */
  renderDay?: (day: CalendarDate) => ReactNode;
  /** Optional custom class names */
  className?: string;
  /** Show/hide week numbers */
  showWeekNumbers?: boolean;
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: number;
}

/**
 * Props for individual DayCell components
 * Represents a single day in the calendar
 */
export interface DayCellProps {
  /** The date this cell represents */
  day: CalendarDate;
  /** Whether this day is in the current month */
  isCurrentMonth: boolean;
  /** Whether this day is currently selected */
  isSelected?: boolean;
  /** Whether this day is today */
  isToday?: boolean;
  /** Click handler for day selection */
  onClick?: (day: CalendarDate) => void;
  /** Optional custom class names */
  className?: string;
  /** Events occurring on this day */
  events?: CalendarEvent[];
  /** Whether the day is disabled for selection */
  disabled?: boolean;
}

/**
 * Props for WeekNavigation component
 * Handles week switching in week view
 */
export interface WeekNavigationProps {
  /** Current date in the week view */
  currentDate: CalendarDate;
  /** Function to update the current date */
  setCurrentDate: (date: CalendarDate) => void;
  /** Optional children for custom content */
  children?: ReactNode;
}

/**
 * Props for WeekGrid component
 * Renders the calendar week view
 */
export interface WeekGridProps {
  /** Date representing the week to display */
  date: CalendarDate;
  /** Custom render function for time slots */
  renderTimeSlot?: (time: Date, day: Date) => ReactNode;
  /** Start hour for the day (0-23) */
  startHour?: number;
  /** End hour for the day (0-23) */
  endHour?: number;
}

// =============================================================================
// EVENT TYPES
// =============================================================================

/**
 * Calendar event with full details
 */
export interface CalendarEvent {
  /** Unique identifier for the event */
  id: string;
  /** Event title/name */
  title: string;
  /** Event description */
  description?: string;
  /** Start date and time of the event */
  date: CalendarDate;
  /** End date and time of the event (optional for all-day events) */
  endDate?: CalendarDate;
  /** Whether this is an all-day event */
  allDay?: boolean;
  /** Event color for visual distinction */
  color?: string;
  /** Event priority level */
  priority?: EventPriority;
  /** Event location */
  location?: string;
  /** Event category/tags */
  tags?: string[];
  /** Whether the event is recurring */
  recurring?: boolean;
  /** Event recurrence pattern */
  recurrencePattern?: string;
}

/**
 * Simplified event for display purposes
 */
export interface DisplayEvent {
  id: string;
  title: string;
  date: CalendarDate;
  endDate?: CalendarDate;
  color: string;
  allDay: boolean;
  isMultiDay: boolean;
}

// =============================================================================
// CALENDAR CONFIGURATION
// =============================================================================

/**
 * Complete calendar configuration
 */
export interface CalendarConfig {
  /** Current theme */
  theme: CalendarTheme;
  /** Current view type */
  view: CalendarViewType;
  /** First day of week */
  firstDayOfWeek: number;
  /** Show week numbers */
  showWeekNumbers: boolean;
  /** Business hours start */
  businessHoursStart: number;
  /** Business hours end */
  businessHoursEnd: number;
  /** Available views */
  availableViews: CalendarViewType[];
  /** Custom event colors */
  eventColors: Record<string, string>;
}

/**
 * Date range for selection and display
 */
export interface DateRange {
  start: CalendarDate;
  end: CalendarDate;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Event handlers for calendar interactions
 */
export interface CalendarEventHandlers {
  onDateClick?: (date: CalendarDate) => void;
  onDateSelect?: (date: CalendarDate | DateRange) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  onMonthChange?: (date: CalendarDate) => void;
  onViewChange?: (view: CalendarViewType) => void;
}

/**
 * Calendar state management
 */
export interface CalendarState {
  currentDate: CalendarDate;
  currentView: CalendarViewType;
  selectedDate?: CalendarDate;
  selectedRange?: DateRange;
  events: CalendarEvent[];
  isLoading: boolean;
}

// =============================================================================
// DEFAULT CONFIGS
// =============================================================================

/**
 * Default calendar configuration
 */
export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  theme: 'light',
  view: 'month',
  firstDayOfWeek: 0, // Sunday
  showWeekNumbers: false,
  businessHoursStart: 9,
  businessHoursEnd: 17,
  availableViews: ['month', 'week', 'day', 'agenda'],
  eventColors: {
    default: '#3b82f6',
    business: '#10b981',
    personal: '#8b5cf6',
    urgent: '#ef4444',
    meeting: '#f59e0b'
  }
} as const;

/**
 * Default event colors by priority
 */
export const EVENT_COLORS_BY_PRIORITY: Record<EventPriority, string> = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f59e0b',
  critical: '#ef4444'
} as const;