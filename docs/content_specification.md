# FIGS Claims Interpreter
## Content Strategy & Information Architecture

**Version:** 1.0  
**Date:** July 13, 2025  
**Purpose:** Detailed content specification for UI/UX designers

---

## Component Library Specifications (Figma Components Page)

### Form Components

#### File Upload Component
- **States:** Default, Drag Active, Uploading, Success, Error
- **Content Elements:**
  - Default: "Drag and drop your CSV file here" + "or click to browse files"
  - Drag Active: "Drop file to upload"
  - Uploading: Progress bar + "Uploading... X% complete"
  - Success: Checkmark + filename + file size
  - Error: Error icon + specific error message
- **Size Variants:** Large (main upload), Small (secondary uploads)

#### Text Input Component  
- **Types:** Single line, Multi-line (textarea), Code/JSON input
- **States:** Default, Focus, Error, Success, Disabled
- **Content Elements:**
  - Label text
  - Placeholder text
  - Helper text (below input)
  - Error/success message
  - Character counter (for limited inputs)
- **Size Variants:** Small, Medium, Large

#### Button Component
- **Types:** Primary, Secondary, Ghost, Danger
- **States:** Default, Hover, Active, Disabled, Loading
- **Content Elements:**
  - Button text
  - Icon (optional, left or right)
  - Loading spinner (loading state)
- **Size Variants:** Small, Medium, Large

#### Checkbox/Toggle Component
- **States:** Unchecked, Checked, Indeterminate, Disabled
- **Content Elements:**
  - Label text
  - Helper text (optional)
- **Variants:** Checkbox, Toggle switch

#### Dropdown/Select Component
- **States:** Default, Open, Selected, Error, Disabled
- **Content Elements:**
  - Label text
  - Placeholder text ("Select an option...")
  - Selected value text
  - Dropdown options list
  - Search input (for searchable dropdowns)

### Data Display Components

#### Statistics Card Component
- **Content Elements:**
  - Card title
  - Primary metric/number
  - Secondary descriptive text
  - Trend indicator (optional: ↑↓ with percentage)
  - Icon (optional)
- **Variants:** Single stat, Multi-stat, With trend
- **States:** Default, Loading (skeleton), Error

#### Data Table Component
- **Content Elements:**
  - Column headers
  - Row data
  - Sort indicators (arrows)
  - Pagination controls
  - Row selection checkboxes
  - Empty state message
- **States:** Default, Loading, Empty, Error
- **Variants:** Simple, With pagination, With selection

#### Progress Bar Component
- **Content Elements:**
  - Progress percentage text
  - Progress label/description
  - Estimated time remaining (optional)
- **Variants:** Linear, Circular, Stepped
- **States:** In progress, Complete, Error

#### Validation Result Component
- **Content Elements:**
  - Status icon (✓ ✗ ⚠)
  - Status message
  - Additional detail text (optional)
- **Variants:** Success, Error, Warning, Info
- **States:** Default, Expanded (with details)

### Navigation Components

#### Breadcrumb Component
- **Content Elements:**
  - Step names ("Upload → Configure → Analyze")
  - Current step indicator
  - Step numbers (optional)
- **States:** Active step, Completed step, Future step
- **Variants:** Text only, With icons, Numbered

#### Page Header Component
- **Content Elements:**
  - Page title
  - Page description/subtitle
  - Action buttons (top-right)
  - Breadcrumb/navigation
- **Variants:** Simple, With actions, With breadcrumb

#### Tab Navigation Component
- **Content Elements:**
  - Tab labels
  - Active indicator
  - Badge/counter (optional)
- **States:** Default, Active, Hover, Disabled
- **Variants:** Horizontal, Vertical

### Visualization Components

#### Tooltip Component
- **Content Elements:**
  - Title text
  - Body content (multiple lines supported)
  - Arrow pointer
- **Variants:** Dark, Light, Large (with multiple data points)
- **Positions:** Top, Bottom, Left, Right

#### Legend Component
- **Content Elements:**
  - Color/shape indicators
  - Label text
  - Count/percentage (optional)
- **Variants:** Horizontal, Vertical, Compact

#### Chart Controls Component
- **Content Elements:**
  - Zoom controls (+/- buttons)
  - Reset button
  - Current zoom level display
  - Pan instructions
- **Variants:** Compact, Full controls

### Modal/Overlay Components

#### Modal Component
- **Content Elements:**
  - Modal title
  - Close button (X)
  - Modal body content area
  - Action buttons (footer)
- **Size Variants:** Small, Medium, Large, Full-screen
- **Types:** Standard, Confirmation, Form modal

#### Popup/Overlay Component
- **Content Elements:**
  - Popup content area
  - Close/dismiss controls
  - Arrow/pointer (if anchored)
- **Variants:** Tooltip-style, Card-style, Full overlay

### Feedback Components

#### Alert/Message Component
- **Content Elements:**
  - Alert icon
  - Alert title
  - Alert message/description
  - Action button (optional)
  - Dismiss button (optional)
- **Types:** Success, Error, Warning, Info
- **Variants:** Inline, Toast/notification, Banner

#### Loading Skeleton Component
- **Content Elements:**
  - Placeholder shapes (rectangles, circles)
  - Shimmer animation
- **Variants:** Text line, Card, Table row, Chart placeholder

#### Empty State Component
- **Content Elements:**
  - Illustration/icon
  - Empty state title
  - Description text
  - Call-to-action button
- **Variants:** No data, No results, Error state

### Specialized Components

#### Tree Node Component
- **Content Elements:**
  - Feature name
  - Threshold value
  - Comparison operator
  - Node value (for leaf nodes)
  - Connection lines
- **States:** Default, Active (during animation), Traversed
- **Types:** Root node, Decision node, Leaf node

#### Score Display Component
- **Content Elements:**
  - Score value (large, prominent)
  - Score label/description
  - Risk level indicator
  - Color coding background
- **Variants:** Large (main display), Small (in tables), With confidence

#### Animation Controls Component
- **Content Elements:**
  - Play/pause button
  - Reset button
  - Speed control slider
  - Progress indicator
  - Step forward/back buttons
- **States:** Playing, Paused, Complete
- **Variants:** Full controls, Minimal controls

#### Claim Point Component (for visualizations)
- **Content Elements:**
  - Point/dot visual
  - Hover state styling
  - Selected state styling
- **Variants:** By classification (STP/Non-STP/Excluded/Outlier)
- **States:** Default, Hover, Selected, Highlighted

### Layout Components

#### Card Component
- **Content Elements:**
  - Card header (title + optional actions)
  - Card body content area
  - Card footer (optional)
- **Variants:** Simple, With header, With footer, Elevated
- **States:** Default, Hover, Selected

#### Section Component
- **Content Elements:**
  - Section title
  - Section description (optional)
  - Content area
  - Section actions (optional)
- **Variants:** Collapsible, Always expanded, With dividers

#### Grid Layout Component
- **Content Elements:**
  - Grid container
  - Grid items/cells
  - Column headers
  - Row spacing
- **Variants:** 2-column, 3-column, 4-column, Responsive

### Interactive Components

#### Drag and Drop Zone Component
- **Content Elements:**
  - Drop zone area
  - Instructions text
  - File icon/illustration
  - Browse button
- **States:** Default, Drag hover, Active, Success, Error
- **Variants:** Large (main upload), Small (additional files)

#### Search Component
- **Content Elements:**
  - Search icon
  - Search input field
  - Clear button (when typing)
  - Search suggestions/results
- **States:** Empty, Typing, With results, No results
- **Variants:** Global search, Table search, Filtered search

### Component State Specifications

#### Loading States (All Components)
- **Skeleton Loading:** Gray placeholder shapes with shimmer
- **Spinner Loading:** Circular spinner with "Loading..." text
- **Progress Loading:** Progress bar with percentage/status

#### Error States (All Components)
- **Error Icon:** Red warning/error icon
- **Error Message:** Clear, actionable error text
- **Retry Option:** "Try again" or "Reload" button

#### Empty States (All Components)
- **Empty Icon:** Relevant illustration or icon
- **Empty Title:** "No [items] found" or similar
- **Empty Description:** Helpful explanation
- **Action Button:** "Add [item]" or similar call-to-action

#### Success States (All Components)
- **Success Icon:** Green checkmark
- **Success Message:** Confirmation text
- **Next Action:** Clear indication of what to do next

---

## Navigation & Global Elements

### Application Header (All Pages)
- **Application Title:** "FIGS Claims Interpreter"
- **Subtitle:** "Interactive Anomaly Score Analysis Tool"
- **Version Indicator:** "v1.0" (small, secondary text)
- **Progress Indicator:** Step tracker showing current page in workflow
  - Steps: "Upload → Configure → Analyze → [Current Page]"
- **Help Icon:** Tooltip with "Press H for keyboard shortcuts"
- **Settings Access:** Gear icon (available from Dashboard onward)

### Footer (All Pages)
- **Status Bar:** Current operation status and system messages
- **Progress Indicator:** For file processing operations
- **Error/Success Messages:** Contextual alerts and confirmations

---

## Page 1: Data Upload Page (`/upload`)

### Page Header
- **Page Title:** "Data Upload"
- **Page Description:** "Upload your claims data CSV file to begin analysis"
- **Step Indicator:** "Step 1 of 4"

### Main Content Areas

#### Primary Upload Zone
- **Section Title:** "Claims Data File"
- **Upload Area Instructions:**
  - "Drag and drop your CSV file here"
  - "or click to browse files"
- **File Requirements List:**
  - "Supported formats: CSV files (.csv)"
  - "Maximum file size: 500MB"
  - "Maximum records: 500,000 rows"
  - "Required: claim_id column"
- **Upload Progress Display:**
  - "Uploading... X% complete"
  - "Processing... X of Y rows"
  - File size: "X MB"
  - Estimated time remaining: "X minutes"

#### File Validation Results
- **Section Title:** "File Validation Results"
- **Success State Messages:**
  - "✓ File format valid"
  - "✓ File size acceptable: X MB"
  - "✓ X rows detected"
  - "✓ X columns detected"
  - "✓ claim_id column found"
- **Error State Messages:**
  - "✗ Invalid file format. Please upload a CSV file."
  - "✗ File too large. Maximum size is 500MB."
  - "✗ Too many rows. Maximum is 500,000 records."
  - "✗ claim_id column not found"
  - "✗ File appears to be corrupted"

#### Data Preview Section
- **Section Title:** "Data Preview"
- **Table Headers:** Show first 5 column names from CSV
- **Sample Data:** Display first 3 rows of data
- **Summary Statistics:**
  - "Total Rows: X"
  - "Total Columns: X"
  - "Detected Delimiter: comma/semicolon/tab"
  - "Detected Encoding: UTF-8/Latin-1"

#### Action Buttons
- **Primary Button:** "Continue to Configuration" (enabled when file valid)
- **Secondary Button:** "Upload Different File"
- **Help Link:** "View sample data format"

#### Error Handling Messages
- **File Processing Errors:**
  - "Unable to read file. Please check file permissions."
  - "File appears to be empty or corrupted."
  - "Unexpected file format. Please ensure file is a valid CSV."
- **Performance Warnings:**
  - "Large file detected. Processing may take several minutes."
  - "File contains X rows. Consider using a smaller sample for initial testing."

---

## Page 2: Configuration Page (`/configure`)

### Page Header
- **Page Title:** "Configuration Setup"
- **Page Description:** "Configure data schema and FIGS tree structure"
- **Step Indicator:** "Step 2 of 4"

### Main Content Areas

#### Data Schema Configuration
- **Section Title:** "Data Schema Configuration"
- **Instructions:** "Define data types for your CSV columns (JSON format matching pandas .info() output)"
- **Input Label:** "Schema JSON"
- **Placeholder Text:** 
```
{
  "claim_id": "object",
  "count_of_parts": "float64",
  "damage_left": "int64",
  "anomaly_score": "float64"
}
```
- **Helper Text:** "Upload JSON file or paste schema directly"
- **File Upload Option:** "Upload schema.json file"

#### Schema Validation Results
- **Section Title:** "Schema Validation"
- **Validation Success Messages:**
  - "✓ Valid JSON format"
  - "✓ All required data types specified"
  - "✓ claim_id column mapped correctly"
  - "✓ X columns successfully mapped"
- **Validation Error Messages:**
  - "✗ Invalid JSON format. Please check syntax."
  - "✗ Missing required column: claim_id"
  - "✗ Unknown data type: [type]. Use: float64, int64, object, bool"
  - "✗ Column '[column]' not found in uploaded CSV"

#### Column Mapping Display
- **Section Title:** "Column Mapping Summary"
- **Table Headers:** "CSV Column | Data Type | Sample Value | Status"
- **Mapping Status Indicators:**
  - "✓ Mapped" (green)
  - "⚠ Unmapped" (yellow)
  - "✗ Error" (red)

#### FIGS Tree Configuration
- **Section Title:** "FIGS Tree Structure"
- **Instructions:** "Paste your FIGS tree structure in the exact format from your model output"
- **Input Label:** "Tree Structure"
- **Placeholder Text:**
```
count_of_parts <= 1.500 (Tree #0 root)
	damage_left <= 0.500 (split)
		damage_rear <= 0.500 (split)
			Val: 0.212 (leaf)
			Val: 0.335 (leaf)
		Val: 0.454 (leaf)
	+
damage_right <= 0.500 (Tree #1 root)
	...
```
- **File Upload Option:** "Upload tree structure file"

#### Tree Validation Results
- **Section Title:** "Tree Structure Validation"
- **Validation Success Messages:**
  - "✓ Tree structure parsed successfully"
  - "✓ X trees detected"
  - "✓ All tree features found in schema"
  - "✓ All leaf nodes contain valid values"
- **Validation Error Messages:**
  - "✗ Invalid tree format. Please check indentation and syntax."
  - "✗ Feature '[feature]' not found in data schema"
  - "✗ Invalid threshold value in Tree #X"
  - "✗ Missing leaf values in Tree #X"
  - "✗ Circular reference detected in Tree #X"

#### Tree Summary Display
- **Section Title:** "Parsed Trees Summary"
- **Tree List Display:**
  - "Tree #0: count_of_parts → damage_left → damage_rear (3 levels)"
  - "Tree #1: damage_right → loss_days_from_policy (2 levels)"
  - "Tree #2: Make_Continent_North America (1 level)"
- **Features Used Summary:** "Features required: count_of_parts, damage_left, damage_rear, damage_right, loss_days_from_policy, Make_Continent_North America"

#### Action Buttons
- **Primary Button:** "Start Analysis" (enabled when all validations pass)
- **Secondary Button:** "Back to Upload"
- **Helper Buttons:** 
  - "Download Schema Template"
  - "Download Tree Template"
  - "Validate Configuration"

#### Configuration Summary
- **Section Title:** "Configuration Summary"
- **Summary Display:**
  - "Data File: [filename] (X rows, Y columns)"
  - "Schema: X columns mapped"
  - "Trees: X trees configured"
  - "Ready for analysis: Yes/No"

---

## Page 3: Dashboard Page (`/dashboard`)

### Page Header
- **Page Title:** "Claims Anomaly Analysis Dashboard"
- **Page Description:** "Interactive visualization of anomaly scores across all claims"
- **Data Summary:** "Analyzing X claims with Y trees | Model: FIGS Regression"

### Main Content Areas

#### Dataset Overview Panel
- **Section Title:** "Dataset Overview"
- **Statistics Display:**
  - "Total Claims: X"
  - "STP Claims: X (Y%)"
  - "Non-STP Claims: X (Y%)"
  - "Excluded Claims: X (Y%)"
  - "Score Range: 0.XXX - 0.XXX"
  - "Average Score: 0.XXX"

#### Visualization Controls
- **Section Title:** "Visualization Controls"
- **Zoom Controls:**
  - "Zoom In" button
  - "Zoom Out" button
  - "Reset View" button
  - "Zoom Level: X%"
- **Filter Controls:**
  - "Show STP Claims" (checkbox)
  - "Show Non-STP Claims" (checkbox)
  - "Show Excluded Claims" (checkbox)
  - "Show Univariate Outliers" (checkbox)
- **Display Options:**
  - "Point Size: Small/Medium/Large"
  - "Show Score Thresholds" (checkbox)

#### Swarm Plot Visualization Area
- **Chart Title:** "Anomaly Score Distribution"
- **Y-Axis Label:** "Anomaly Score"
- **X-Axis Label:** "Claims (Jittered)"
- **Legend:**
  - "● STP Claims (Green)"
  - "● Non-STP Claims (Red)"
  - "● Excluded Claims (Gray)"
  - "● Univariate Outliers (Orange)"
- **Threshold Lines:**
  - "Low Risk Threshold: 0.XXX"
  - "High Risk Threshold: 0.XXX"

#### Hover Tooltip Content
- **Claim Information:**
  - "Claim ID: [claim_id]"
  - "Anomaly Score: 0.XXXX"
  - "Classification: STP/Non-STP/Excluded"
  - "Risk Level: Low/Medium/High"
  - "Click to analyze trees"

#### Quick Statistics Panel
- **Section Title:** "Score Distribution"
- **Distribution Stats:**
  - "Low Risk (< 0.XXX): X claims (Y%)"
  - "Medium Risk (0.XXX - 0.XXX): X claims (Y%)"
  - "High Risk (> 0.XXX): X claims (Y%)"
- **Recent Activity:**
  - "Last analyzed: Claim #[ID]"
  - "Most recent high risk: Claim #[ID]"

#### Action Buttons
- **Primary Actions:**
  - "Settings" (gear icon)
  - "Export Data" 
  - "Export Visualization"
- **Secondary Actions:**
  - "Load New Dataset"
  - "Adjust Thresholds"
  - "View Help"

#### Status Messages
- **Loading States:**
  - "Loading claims data..."
  - "Generating visualization..."
  - "Processing X of Y claims..."
- **Interactive States:**
  - "Hover over points to see details"
  - "Click any point to view tree analysis"
  - "X claims currently visible"

---

## Page 4: Tree Analysis Page (`/analysis/:claimId`)

### Page Header
- **Page Title:** "Tree Analysis: Claim #[ClaimID]"
- **Claim Summary:** "Score: 0.XXXX | Classification: [STP/Non-STP] | Risk Level: [Low/Medium/High]"
- **Navigation:** "← Back to Dashboard | → Next Claim | ← Previous Claim"

### Main Content Areas

#### Claim Details Panel
- **Section Title:** "Claim Information"
- **Claim Data Display:**
  - "Claim ID: [claim_id]"
  - "Final Anomaly Score: 0.XXXX"
  - "Classification: STP/Non-STP"
  - "Confidence Level: XX%"
  - "Analysis Date: [timestamp]"

#### Feature Values Panel
- **Section Title:** "Feature Values for This Claim"
- **Feature List:**
  - "count_of_parts: X.X"
  - "damage_left: X"
  - "damage_rear: X"
  - "damage_right: X"
  - "[...other features]"

#### Tree Visualization Area
- **Section Title:** "Decision Tree Analysis"
- **Instructions:** "Watch how each tree contributes to the final anomaly score"

#### Individual Tree Headers (for each tree)
- **Tree Title:** "Tree #X: [Tree Name]"
- **Tree Contribution:** "Contribution: +0.XXX"
- **Tree Status:** "Status: Active/Traversed"

#### Tree Node Content (displayed during traversal)
- **Decision Nodes:**
  - "Feature: [feature_name]"
  - "Threshold: ≤ X.XXX"
  - "Actual Value: X.XXX"
  - "Comparison: X.XXX ≤ X.XXX = True/False"
  - "Direction: Going Left/Right"
- **Leaf Nodes:**
  - "Final Value: +0.XXX"
  - "This path contributes: +0.XXX to total score"

#### Final Calculation Panel
- **Section Title:** "Score Calculation Breakdown"
- **Tree Contributions List:**
  - "Tree #0 contribution: +0.XXX"
  - "Tree #1 contribution: +0.XXX"
  - "Tree #2 contribution: +0.XXX"
  - "[...other trees]"
- **Calculation Steps:**
  - "Sum of all trees: 0.XXX + 0.XXX + ... = X.XXX"
  - "Apply sigmoid function: sigmoid(X.XXX) = 0.XXXX"
  - "Final anomaly score: 0.XXXX"
- **Classification Logic:**
  - "Score 0.XXXX vs Thresholds:"
  - "Low Risk: < 0.XXX ✗"
  - "Medium Risk: 0.XXX - 0.XXX ✗"
  - "High Risk: > 0.XXX ✓"
  - "Final Classification: High Risk (Non-STP)"

#### Animation Controls
- **Section Title:** "Animation Controls"
- **Control Buttons:**
  - "▶ Play Analysis"
  - "⏸ Pause"
  - "⏹ Reset"
  - "⏭ Next Step"
  - "⏮ Previous Step"
- **Speed Control:**
  - "Animation Speed: 0.5x | 1x | 1.5x | 2x"
- **Progress Indicator:**
  - "Step X of Y: [Current Action Description]"

#### Edge Case Content

##### Missing Data Display
- **Section Title:** "Analysis Unavailable"
- **Missing Data Message:**
  - "Cannot perform tree analysis for this claim"
  - "Missing required features:"
  - "• [feature_name_1]"
  - "• [feature_name_2]"
- **Available Information:**
  - "Claim ID: [claim_id]"
  - "Available features: [list]"
  - "Recommendation: Complete missing data for full analysis"

##### Excluded Claims Display
- **Section Title:** "Excluded Claim Analysis"
- **Exclusion Information:**
  - "This claim was excluded from standard processing"
  - "Exclusion Reason: [secondary_tag]"
  - "Exclusion Category: Business Rules/Data Quality"
- **Available Score:**
  - "Assigned Score: 0.XXXX (if available)"
  - "Score Source: Pre-processing Assessment"

##### Univariate Outlier Display
- **Section Title:** "Univariate Outlier Analysis"
- **Outlier Information:**
  - "This claim was flagged as a univariate outlier"
  - "Outlier Features:"
  - "• [feature_name]: X.XX (Normal range: Y.YY - Z.ZZ)"
  - "• [feature_name]: X.XX (99th percentile: Y.YY)"
- **Score Information:**
  - "Outlier Score: 0.XXXX"
  - "Detection Method: Statistical Outlier Analysis"

#### Action Buttons
- **Primary Actions:**
  - "Back to Dashboard"
  - "Analyze Another Claim"
  - "Export Analysis"
- **Secondary Actions:**
  - "Share Analysis"
  - "Print Report"
  - "Copy Calculation Steps"

---

## Page 5: Settings Page (`/settings`)

### Page Header
- **Page Title:** "Settings & Configuration"
- **Page Description:** "Adjust analysis parameters and application preferences"
- **Last Modified:** "Settings last updated: [timestamp]"

### Main Content Areas

#### Score Threshold Configuration
- **Section Title:** "Anomaly Score Thresholds"
- **Description:** "Define risk level boundaries for claim classification"
- **Threshold Inputs:**
  - "Low Risk Maximum: 0.XXX (claims below this are Low Risk)"
  - "High Risk Minimum: 0.XXX (claims above this are High Risk)"
  - "Medium Risk Range: 0.XXX - 0.XXX (automatically calculated)"
- **Validation Messages:**
  - "✓ Valid threshold configuration"
  - "✗ Low threshold must be less than high threshold"
  - "✗ Thresholds must be between 0.0 and 1.0"
- **Impact Preview:**
  - "With current data, this would classify:"
  - "• X claims as Low Risk (Y%)"
  - "• X claims as Medium Risk (Y%)"
  - "• X claims as High Risk (Y%)"

#### Animation Preferences
- **Section Title:** "Animation Settings"
- **Animation Controls:**
  - "Default Animation Speed: 0.5x | 1x | 1.5x | 2x"
  - "Auto-play Animations: On/Off"
  - "Show Step-by-Step Calculation: On/Off"
  - "Animation Duration: X seconds"
- **Performance Options:**
  - "Enable Smooth Animations: On/Off"
  - "Reduce Motion (Accessibility): On/Off"

#### Visualization Preferences
- **Section Title:** "Visualization Settings"
- **Display Options:**
  - "Default Point Size: Small/Medium/Large"
  - "Show Threshold Lines: On/Off"
  - "Color Scheme: Default/High Contrast/Colorblind Friendly"
  - "Show Tooltips: On/Off"
- **Performance Settings:**
  - "Enable Virtualization for Large Datasets: On/Off"
  - "Maximum Points to Display: X"
  - "Use Canvas Rendering (Large Datasets): On/Off"

#### Export Configuration
- **Section Title:** "Export Settings"
- **Default Export Options:**
  - "Image Resolution: 72 DPI | 150 DPI | 300 DPI"
  - "Image Format: PNG | PDF | SVG"
  - "Include Metadata: On/Off"
  - "Export Filename Pattern: [pattern]"
- **Report Settings:**
  - "Include Tree Calculations: On/Off"
  - "Include Feature Values: On/Off"
  - "Include Summary Statistics: On/Off"

#### Model Configuration
- **Section Title:** "Model Management"
- **Current Configuration:**
  - "Loaded Trees: X trees"
  - "Features Required: X features"
  - "Model Type: FIGS Regression"
  - "Configuration Date: [timestamp]"
- **Model Actions:**
  - "Load New Tree Configuration"
  - "Validate Current Configuration"
  - "Export Current Configuration"
  - "Reset to Default Configuration"

#### Advanced Settings
- **Section Title:** "Advanced Options"
- **Performance Settings:**
  - "Enable Web Workers: On/Off"
  - "Memory Usage Limit: X MB"
  - "Processing Chunk Size: X rows"
- **Debugging Options:**
  - "Enable Debug Mode: On/Off"
  - "Log Performance Metrics: On/Off"
  - "Show Calculation Details: On/Off"

#### Help & Documentation
- **Section Title:** "Help & Resources"
- **Documentation Links:**
  - "User Guide"
  - "Keyboard Shortcuts"
  - "Troubleshooting Guide"
  - "Sample Data Downloads"
- **Support Information:**
  - "Version: X.X.X"
  - "Last Updated: [date]"
  - "Report Issues"
  - "Contact Support"

#### Action Buttons
- **Primary Actions:**
  - "Save Settings"
  - "Apply and Return to Dashboard"
- **Secondary Actions:**
  - "Reset to Defaults"
  - "Export Settings"
  - "Import Settings"
- **Navigation:**
  - "Back to Dashboard"
  - "Cancel Changes"

#### Status Messages
- **Save States:**
  - "Settings saved successfully"
  - "Settings applied to current session"
  - "Some changes require refresh to take effect"
- **Validation Messages:**
  - "All settings valid"
  - "Warning: These settings may impact performance"
  - "Error: Invalid configuration detected"

---

## Global Error Messages & States

### Loading States
- **Data Processing:** "Processing large dataset... X% complete"
- **Tree Parsing:** "Parsing tree structure..."
- **Visualization Rendering:** "Generating visualization..."
- **Calculation:** "Calculating predictions for X claims..."

### Error States
- **General Errors:**
  - "An unexpected error occurred. Please refresh and try again."
  - "Unable to process request. Please check your data and configuration."
- **Data Errors:**
  - "Data validation failed. Please check your CSV file and schema."
  - "Tree configuration invalid. Please verify your tree structure."
- **Performance Errors:**
  - "Dataset too large for current settings. Consider using a smaller sample."
  - "Browser memory limit reached. Please reduce dataset size."

### Success Messages
- **Configuration:** "Configuration saved successfully"
- **Data Processing:** "X claims processed successfully"
- **Export:** "File exported successfully"
- **Analysis:** "Tree analysis completed"

### Help & Guidance Text
- **Contextual Tips:**
  - "Tip: Hold Shift while clicking to select multiple claims"
  - "Tip: Use mouse wheel to zoom in/out on visualizations"
  - "Tip: Press 'H' to see all keyboard shortcuts"
- **Workflow Guidance:**
  - "Next: Configure your data schema to proceed"
  - "Ready: All configurations valid. Click 'Start Analysis' to continue"
  - "Complete: Your analysis is ready. Explore claims by clicking on points"