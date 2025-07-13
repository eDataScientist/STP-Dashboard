# FIGS Interactive Claims Interpreter

## Software Requirements Specification (SRS)

**Document Version:** 1.0  
**Date:** July 13, 2025  
**Project Type:** Proof of Concept / Interactive Demo Tool

---

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for developing an interactive web application that demonstrates FIGS (Fast Interpretable Greedy-Tree Sums) model interpretability for claims anomaly detection. The application serves as a presentation and demonstration tool for the data science team to showcase model decision-making processes.

### 1.2 Scope

The application will:

- Load and visualize claims data with anomaly scores
- Display interactive decision tree traversals
- Provide animated explanations of model predictions
- Support multiple FIGS model configurations
- Handle various claim types and edge cases

### 1.3 Document Conventions

Requirements are prioritized using the MoSCoW method:

- **M** - Must Have (Critical)
- **S** - Should Have (Important)
- **C** - Could Have (Nice to Have)
- **W** - Won't Have (Future Consideration)

---

## 2. Functional Requirements

### 2.1 Data Input and Upload

#### FR-1: CSV File Upload Interface **[M]**

- The system must allow the user to upload CSV files through a drag-and-drop interface
- The system must allow the user to upload CSV files through a file browser dialog
- The system must allow the user to upload CSV files up to 500MB in size
- The system must display upload progress for files larger than 10MB
- The system must validate CSV file format before processing
- The system must display clear error messages for invalid file formats
- The system must support CSV files with various encodings (UTF-8, Latin-1, Windows-1252)
- The system must support CSV files with different delimiters (comma, semicolon, tab, pipe)
- The system must support CSV files with up to 500,000 rows
- The system must support CSV files with up to 100 columns

#### FR-2: Schema Configuration Management **[M]**

- The system must allow the user to upload schema configuration as a JSON file
- The system must allow the user to paste schema configuration as JSON text
- The system must validate JSON schema format before processing
- The system must require the schema to specify data types for each column following pandas .info() format
- The system must validate that all required columns exist in the uploaded CSV
- The system must display a clear mapping table showing CSV columns matched to schema definitions
- The system must highlight any unmapped columns in the CSV file
- The system must display data type mismatches between CSV and schema
- The system must allow the user to proceed only when schema validation passes completely
- The system must save the last used schema configuration for reuse

#### FR-3: FIGS Tree Structure Input **[M]**

- The system must allow the user to upload FIGS tree structure as a text file
- The system must allow the user to paste FIGS tree structure as plain text
- The system must parse the exact indented text format as provided in requirements
- The system must validate tree structure completeness before processing
- The system must validate that all tree features exist in the uploaded CSV schema
- The system must convert parsed text structure to internal YAML format
- The system must display parsing errors with specific line numbers and descriptions
- The system must validate that each tree has proper root, split, and leaf nodes
- The system must validate that all leaf nodes contain numerical values
- The system must support multiple trees within a single configuration
- The system must validate that tree feature names match exactly with CSV column names

### 2.2 Data Processing and Validation

#### FR-4: CSV Data Processing **[M]**

- The system must parse CSV data according to the provided schema configuration
- The system must convert data types as specified in the schema
- The system must identify and flag rows with missing required data
- The system must identify and flag rows with invalid data types
- The system must display data processing progress for large files
- The system must complete data processing within 30 seconds for files up to 100k rows
- The system must display summary statistics after successful data processing
- The system must show row counts for valid, invalid, and excluded data
- The system must allow the user to download a report of data processing issues

#### FR-5: Tree Structure Validation **[M]**

- The system must validate that tree structure references only features present in the CSV schema
- The system must validate that all threshold values are numeric
- The system must validate that all comparison operators are valid (<=, >, <, >=, =)
- The system must validate that each decision path leads to a leaf node
- The system must validate that leaf nodes contain only numeric values
- The system must check for circular references in tree structure
- The system must validate tree depth does not exceed reasonable limits (max 20 levels)

### 2.3 Main Dashboard Interface

#### FR-6: Swarm Plot Visualization **[M]**

- The system must display all valid claims as individual points on a horizontal swarm plot
- The system must position points vertically based on anomaly score value
- The system must apply jitter to points horizontally to prevent overlap
- The system must color-code points based on STP classification (green for STP, red for Non-STP)
- The system must display points for excluded claims in a distinct color (gray)
- The system must display points for univariate outliers in a distinct color (orange)
- The system must support smooth zooming of the swarm plot using mouse wheel
- The system must support panning of the swarm plot using mouse drag
- The system must display score value axis labels on the left side
- The system must display score threshold lines as horizontal guides

#### FR-7: Swarm Plot Interactions **[M]**

- The system must display a tooltip when the user hovers over any point
- The system must include claim ID in the hover tooltip
- The system must include anomaly score in the hover tooltip
- The system must include classification (STP/Non-STP) in the hover tooltip
- The system must include primary reason (if available) in the hover tooltip
- The system must highlight the hovered point with increased size and border
- The system must trigger tree visualization popup when the user clicks on any point
- The system must provide visual feedback (cursor change) when hovering over clickable points
- The system must support keyboard navigation using tab and enter keys
- The system must maintain hover state until user moves to another point

#### FR-8: Performance Optimization for Large Datasets **[M]**

- The system must implement virtualization for datasets exceeding 10,000 points
- The system must maintain 60 FPS during zoom and pan operations
- The system must render initial swarm plot within 5 seconds for 100k points
- The system must respond to hover interactions within 50ms
- The system must implement level-of-detail rendering for zoomed-out views
- The system must implement clustering for overlapping points at certain zoom levels

### 2.4 Tree Visualization System

#### FR-9: Tree Popup Interface **[M]**

- The system must open tree visualization in a full-screen modal popup
- The system must display all trees vertically arranged in a single scrollable canvas
- The system must provide a close button (X) in the top-right corner of the popup
- The system must provide a "Back to Swarm Plot" button in the top-left corner
- The system must display the selected claim ID prominently at the top of the popup
- The system must display the final anomaly score prominently at the top of the popup
- The system must display the final classification (STP/Non-STP) prominently at the top of the popup
- The system must display confidence level if available
- The system must allow the popup to be closed using the Escape key
- The system must disable background scrolling when popup is open

#### FR-10: Individual Tree Structure Display **[M]**

- The system must display each tree with a clear title (e.g., "Tree #0", "Tree #1")
- The system must display tree contribution value for each tree prominently
- The system must arrange nodes in a hierarchical tree structure from left to right
- The system must display root nodes on the left side of each tree
- The system must display leaf nodes on the right side of each tree
- The system must display feature names clearly at each decision node
- The system must display threshold values clearly at each decision node
- The system must display comparison operators clearly at each decision node
- The system must display leaf values prominently with larger font size
- The system must use distinct visual styling for different node types (root, decision, leaf)
- The system must draw clear connecting lines between parent and child nodes
- The system must ensure adequate spacing between nodes to prevent overlap

#### FR-11: Tree Traversal Animation **[M]**

- The system must animate the decision path through each tree sequentially
- The system must highlight the active node with a distinct color during animation
- The system must display the actual feature value being compared at each decision node
- The system must show the comparison result (true/false) at each decision node
- The system must animate the path from root to leaf with a flowing line effect
- The system must display the selected path in a different color after animation completes
- The system must complete individual tree animation within 2-3 seconds
- The system must provide animation controls (play, pause, reset, speed adjustment)
- The system must allow the user to replay the animation multiple times
- The system must ensure animations maintain 60 FPS performance

#### FR-12: Final Score Calculation Display **[M]**

- The system must display individual tree contribution values clearly
- The system must show the mathematical sum of all tree contributions
- The system must display the sigmoid function application if applicable
- The system must show the final anomaly score with appropriate precision (3-4 decimal places)
- The system must display the score-to-classification mapping
- The system must show threshold values used for classification
- The system must highlight whether the score resulted in STP or Non-STP classification
- The system must use color coding consistent with swarm plot (green for STP, red for Non-STP)
- The system must display calculation steps in a step-by-step format
- The system must allow the user to expand/collapse detailed calculation steps

### 2.5 Edge Case Handling

#### FR-13: Missing Data Claims **[M]**

- The system must identify claims with missing required features before tree traversal
- The system must display an informative popup for claims with missing data
- The system must list which specific features are missing
- The system must show available feature values for the claim
- The system must explain why tree traversal cannot be completed
- The system must provide guidance on data completion requirements
- The system must still display the claim ID and any available metadata
- The system must use distinct visual styling for missing data popup

#### FR-14: Excluded Claims Support **[S]**

- The system must identify claims excluded due to business rules from CSV metadata
- The system must display exclusion reason popup when excluded claims are clicked
- The system must show the secondary tag explaining exclusion reason
- The system must display any available anomaly score for excluded claims
- The system must explain why normal tree analysis is not applicable
- The system must provide context about the exclusion category
- The system must maintain consistent popup styling with tree visualization

#### FR-15: Univariate Outlier Claims **[S]**

- The system must identify univariate outlier claims from CSV metadata
- The system must display outlier analysis popup when univariate outlier claims are clicked
- The system must show which specific features triggered outlier detection
- The system must display the outlier values alongside normal ranges
- The system must show the anomaly score assigned to the outlier
- The system must explain the difference between univariate and multivariate detection
- The system must provide visual indicators of outlier severity

### 2.6 Navigation and User Interface Controls

#### FR-16: Zoom and Pan Controls **[M]**

- The system must provide zoom in/out buttons for both swarm plot and tree visualization
- The system must support mouse wheel zooming with smooth acceleration
- The system must provide reset zoom button to return to default view
- The system must support click-and-drag panning for both visualizations
- The system must provide scroll bars when content exceeds viewport
- The system must display current zoom level as a percentage
- The system must limit zoom levels to prevent performance degradation
- The system must maintain aspect ratio during zoom operations

#### FR-17: Keyboard Shortcuts **[S]**

- The system must support Escape key to close any open popup
- The system must support Space bar to play/pause animations
- The system must support Arrow keys for navigation in tree view
- The system must support Plus/Minus keys for zoom in/out
- The system must support R key to reset view to default
- The system must support H key to display help overlay with all shortcuts
- The system must display keyboard shortcuts in a help tooltip

#### FR-18: Responsive Design **[S]**

- The system must adapt layout for screen widths down to 1024px
- The system must maintain functionality on tablet devices (768px width)
- The system must adjust font sizes appropriately for different screen sizes
- The system must reorganize tree layout for smaller screens (vertical to horizontal)
- The system must provide touch-friendly controls for mobile devices
- The system must maintain readability of all text elements across screen sizes

### 2.7 Configuration Management

#### FR-19: Score Threshold Configuration **[S]**

- The system must allow runtime adjustment of score thresholds through a settings panel
- The system must provide input fields for Low/Medium and Medium/High threshold values
- The system must validate that threshold values are between 0.0 and 1.0
- The system must validate that Low threshold < Medium threshold < High threshold
- The system must update swarm plot colors immediately when thresholds change
- The system must update classification displays when thresholds change
- The system must save threshold settings in browser local storage
- The system must provide default threshold values (0.3 and 0.7)
- The system must allow reset to default threshold values

#### FR-20: Model Configuration Swapping **[S]**

- The system must provide interface to load new tree configuration without application restart
- The system must validate new tree configuration against existing CSV data
- The system must clear existing visualization state when loading new model
- The system must regenerate all visualizations with new model
- The system must maintain user interface state (zoom, pan positions) when possible
- The system must display loading indicators during model swap operations
- The system must rollback to previous model if new model validation fails

### 2.8 Export and Reporting Features **[C]**

#### FR-21: Visualization Export **[C]**

- The system must allow export of swarm plot as PNG image at high resolution
- The system must allow export of individual tree visualizations as PNG images
- The system must allow export of complete tree analysis as PDF report
- The system must include metadata (date, model version, claim ID) in exports
- The system must provide configurable image resolution options
- The system must maintain visual quality in exported images

#### FR-22: Data Export **[C]**

- The system must allow export of processed claims data as CSV
- The system must allow export of tree analysis results as JSON
- The system must allow export of anomaly score summary statistics
- The system must include data processing timestamp in exports
- The system must validate exported data integrity

---

## 3. Non-Functional Requirements

### 3.1 Performance

#### NFR-1: Large Dataset Performance **[M]**

- **Description:** Handle hundreds of thousands of records efficiently
- **Metrics:**
  - Initial load: < 10 seconds for 100k records
  - Swarm plot interactions: < 100ms response time
  - Tree visualization: < 2 seconds to render

#### NFR-2: Animation Performance **[M]**

- **Description:** Smooth animations at 60 FPS
- **Metrics:**
  - Tree traversal animations maintain 60 FPS
  - No frame drops during interactions
  - Responsive controls during animations

### 3.2 Usability

#### NFR-3: Intuitive Interface **[M]**

- **Description:** Interface usable without extensive training
- **Metrics:**
  - Data science team can use effectively within 30 minutes
  - Clear visual hierarchy and information organization
  - Consistent interaction patterns throughout

#### NFR-4: Accessibility **[S]**

- **Description:** Basic accessibility compliance
- **Standards:** WCAG 2.1 Level A minimum
- **Features:**
  - Keyboard navigation support
  - Screen reader compatibility for key functions
  - Sufficient color contrast ratios

### 3.3 Compatibility

#### NFR-5: Browser Support **[M]**

- **Description:** Modern browser compatibility
- **Targets:** Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- **Features:** Full functionality in target browsers

#### NFR-6: Operating System Support **[M]**

- **Description:** Cross-platform Docker deployment
- **Targets:** Windows, macOS, Linux
- **Requirements:** Docker runtime compatibility

### 3.4 Maintainability

#### NFR-7: Component Reusability **[M]**

- **Description:** Modular, reusable component architecture
- **Goals:**
  - Easy adaptation to different datasets
  - Simple model configuration changes
  - Extensible visualization components

#### NFR-8: Code Quality **[S]**

- **Description:** High-quality, maintainable codebase
- **Standards:**
  - TypeScript for type safety
  - ESLint/Prettier for code formatting
  - Component documentation
  - Unit test coverage > 80%

### 3.5 Security

#### NFR-9: Data Privacy **[M]**

- **Description:** Secure handling of claims data
- **Requirements:**
  - No data persistence beyond session
  - Local processing only (no external API calls with data)
  - Secure file upload handling

---

## 4. Technical Architecture

### 4.1 Technology Stack

- **Frontend Framework:** Next.js 14+
- **UI Components:** shadcn/ui + custom components
- **Styling:** Tailwind CSS
- **Visualizations:** D3.js or Recharts
- **State Management:** React Context/Zustand
- **Language:** TypeScript
- **Package Manager:** npm/yarn

### 4.2 Application Structure

```
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── charts/       # Visualization components
│   ├── trees/        # Tree-specific components
│   └── layout/       # Layout components
├── lib/
│   ├── parsers/      # CSV and tree parsers
│   ├── types/        # TypeScript definitions
│   └── utils/        # Utility functions
├── hooks/            # Custom React hooks
└── app/              # Next.js app router
```

### 4.3 Data Flow

1. CSV upload → Schema validation → Data parsing
2. Tree configuration → Structure validation → Tree building
3. Swarm plot rendering → User interaction → Tree popup
4. Tree traversal → Animation → Result display

---

## 5. Data Requirements

### 5.1 Input Data Formats

#### CSV Data Structure

- **Required:** `claim_id` column (any name, specified in schema)
- **Variable:** Feature columns matching tree requirements
- **Optional:** `anomaly_score`, classification tags
- **Size:** Support up to 500k records

#### Tree Structure Format

**Text Format (Input):**

```
count_of_parts <= 1.500 (Tree #0 root)
	damage_left <= 0.500 (split)
		damage_rear <= 0.500 (split)
			Val: 0.212 (leaf)
			Val: 0.335 (leaf)
		Val: 0.454 (leaf)
```

**YAML Format (Internal):**

```yaml
trees:
  - name: 'Tree #0'
    root:
      feature: 'count_of_parts'
      threshold: 1.500
      # ... structure continues
```

### 5.2 Configuration Files

#### Schema Mapping

```json
{
  "claim_id": "object",
  "count_of_parts": "float64",
  "damage_left": "int64",
  "damage_rear": "int64",
  "anomaly_score": "float64"
}
```

#### Application Config

```json
{
  "score_thresholds": {
    "low": 0.3,
    "medium": 0.7
  },
  "visualization": {
    "max_points_without_virtualization": 10000,
    "animation_duration": 2000
  }
}
```

---

## 6. User Interface Requirements

### 6.1 Layout Structure

- **Header:** Application title, configuration controls
- **Main Area:** Swarm plot or tree visualization
- **Footer:** Status information, controls

### 6.2 Component Specifications

#### Swarm Plot Component

- Responsive SVG-based visualization
- Hover states with claim information tooltip
- Click handlers for tree popup trigger
- Color coding by claim classification
- Zoom and pan capabilities for large datasets

#### Tree Visualization Component

- Full-screen popup modal
- Vertical tree layout with scroll/zoom
- Animated path highlighting
- Node information displays
- Navigation controls (close, reset, replay)

#### Data Upload Component

- Drag-and-drop file upload
- Progress indicators for large files
- Error handling and validation feedback
- Schema configuration interface

---

## 7. Testing Requirements

### 7.1 Functional Testing **[M]**

- Upload and parsing of various CSV formats
- Tree structure parsing and validation
- Swarm plot interactions and performance
- Tree visualization accuracy and animations
- Edge case handling (missing data, outliers)

### 7.2 Performance Testing **[M]**

- Large dataset loading (100k+ records)
- Visualization rendering performance
- Animation frame rates
- Memory usage optimization

### 7.3 Usability Testing **[S]**

- Data science team workflow validation
- Interface intuitiveness assessment
- Error message clarity evaluation

---

## 8. Deployment Requirements

### 8.1 Docker Configuration **[M]**

- **Base Image:** Node.js 18+ Alpine
- **Port:** 3000 (configurable)
- **Volume Mounts:** None required (stateless)
- **Environment Variables:** Minimal configuration

### 8.2 Development Setup **[M]**

- **Prerequisites:** Node.js 18+, Docker
- **Commands:**
  - `npm install` - Install dependencies
  - `npm run dev` - Development server
  - `npm run build` - Production build
  - `docker build` - Create container image

---

## 9. Documentation Requirements

### 9.1 User Documentation **[M]**

- Quick start guide for data science team
- Configuration file examples
- Troubleshooting common issues

### 9.2 Technical Documentation **[S]**

- Component API documentation
- Data format specifications
- Deployment instructions

---

## 10. Future Considerations **[W]**

### 10.1 Potential Enhancements

- Real-time data streaming capabilities
- Advanced filtering and search functionality
- Multiple model comparison views
- Integration with external data sources
- Advanced export and reporting features

### 10.2 Scalability Considerations

- Backend API development for production deployment
- Database integration for persistent storage
- Multi-user support and collaboration features
- Cloud deployment and scaling strategies

---

## 11. Acceptance Criteria Summary

The application will be considered complete when:

1. All **[M]** Must Have requirements are fully implemented
2. Performance benchmarks are met for target dataset sizes
3. Data science team can successfully demonstrate model interpretability
4. Application runs reliably in Docker environment
5. Basic documentation is complete and accessible

---

**Document Approval:**

- **Data Science Lead:** [Pending]
- **Development Lead:** [Pending]
- **Technical Reviewer:** [Pending]
