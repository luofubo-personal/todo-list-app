# 📝 Usage Guide

Learn how to effectively use the Todo List Application with its comprehensive feature set.

## 🎨 User Interface Overview

The application features a clean, intuitive interface with the following key areas:

1. **Header Section** - Application title and summary information
2. **Input Section** - Add new todos with optional deadlines
3. **Todo List** - Display of all todos with status indicators
4. **Footer Section** - Todo counter and filtering options

## ➕ Adding Todos

### Basic Todo Creation
1. Type your todo in the input field at the top
2. Press **Enter** or click the **Add** button
3. Your new todo will appear at the top of the list

### Todo with Deadline
1. Type your todo in the input field
2. Click the **📅** (calendar) icon next to the input
3. Select date and time using the datetime picker
4. Press **Enter** or click the **Add** button

### Todo Priority Levels
The application automatically calculates priority based on deadlines:
- **🔴 Urgent** - Due within 2 hours
- **🟠 High** - Due within 24 hours
- **🔵 Medium** - Due within 7 days
- **🟢 Low** - Due in more than 7 days

## ✅ Managing Todo Status

### Marking as Complete
1. Click the checkbox next to any todo
2. The todo will show strikethrough text and gray color
3. The todo counter will decrease

### Marking as Incomplete
1. Click the checkbox next to a completed todo
2. The todo styling will return to normal
3. The todo counter will increase

## 📅 Deadline Management

### Adding Deadlines to Existing Todos
1. Click the **📅** (calendar) icon on any todo
2. Select date and time using the datetime picker
3. The deadline will be saved automatically

### Removing Deadlines
1. Click the **📅** (calendar) icon on any todo with a deadline
2. Clear the date selection
3. The deadline will be removed

### Countdown Timers
Todos with deadlines show real-time countdown timers:
- **2d 5h** - 2 days and 5 hours remaining
- **3h 45m** - 3 hours and 45 minutes remaining
- **15m** - 15 minutes remaining
- **Overdue** - Past the deadline

## 🗑️ Deleting Todos

### Delete Individual Todo
1. Click the **🗑️** (trash) icon on any todo
2. Confirm deletion in the prompt
3. The todo will be removed from the list

### Clear Completed Todos
1. Click the **Clear completed** button in the footer
2. All completed todos will be removed
3. Active todos remain in the list

## 🔍 Filtering and Sorting

### Filter by Status
Use the footer buttons to filter todos:
- **All** - Show all todos (default)
- **Active** - Show only incomplete todos
- **Completed** - Show only completed todos

### Automatic Sorting
Todos are automatically sorted by priority:
1. **Overdue** items appear first
2. **Urgent** items (due within 2 hours)
3. **High** priority items (due within 24 hours)
4. **Medium** priority items (due within 7 days)
5. **Low** priority items (due in more than 7 days)
6. **No deadline** items appear last

## 📊 Todo Counter

The footer displays the current count of active todos:
- Shows number of incomplete todos
- Updates in real-time as you complete/delete todos
- Displays "0 items left" when all todos are completed

## ⌨️ Keyboard Shortcuts

### Navigation
- **Enter** - Add new todo or save deadline
- **Tab** - Move between interface elements
- **Esc** - Close datetime picker or modals

### Todo Management
- **Space** - Toggle todo completion when focused
- **Delete** - Remove todo when focused (with confirmation)

## 📱 Responsive Design

The application works on all device sizes:
- **Desktop** - Full feature set with wide layout
- **Tablet** - Optimized touch targets and spacing
- **Mobile** - Simplified layout with large buttons

## 🔄 Data Persistence

All todos are automatically saved:
- **LocalStorage** - Todos persist between browser sessions
- **Backend API** - Todos synchronized with .NET backend
- **Real-time Updates** - Changes appear immediately across devices

## 🛠️ Settings and Customization

### Theme Options
- **Light Mode** - Default clean white theme
- **Dark Mode** - Reduced eye strain for nighttime use
- **System Preference** - Automatically match OS theme

### Display Options
- **Show/Hide completed** - Toggle visibility of completed todos
- **Auto-sort** - Enable/disable automatic priority sorting
- **Deadline reminders** - Enable browser notifications (future feature)

## 🆘 Troubleshooting

### Common Usage Issues

1. **Todos not saving**
   - Check browser console for errors
   - Verify localStorage is enabled
   - Ensure backend API is running

2. **Deadlines not updating**
   - Refresh the page to reload data
   - Check network connection to backend
   - Verify datetime picker selection

3. **Sorting not working**
   - Ensure todos have deadlines for priority sorting
   - Refresh page to reset sorting algorithm

### Getting Help

- 📚 **Documentation**: Comprehensive guides in wiki
- 🐛 **Issues**: GitHub Issues for usage problems
- 💬 **Discussions**: GitHub Discussions for questions

---
**🎉 You're now an expert in using the Todo List Application!**