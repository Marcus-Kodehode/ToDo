/**
 * @fileoverview Footer Component
 * This file contains the Footer component implementation for the ToDo application.
 */

import { Component } from '@angular/core';

/**
 * @component Footer
 * @description
 * A standalone Angular component that renders the application's footer section.
 * The footer contains:
 * - Application logo and name
 * - Copyright information
 * - Social media links (Instagram, GitHub, Discord)
 *
 * The component is responsive and adjusts its layout based on screen size:
 * - On mobile: Stacks elements vertically
 * - On desktop: Displays elements in a horizontal row
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
})
export class Footer {}

/**
 * File Documentation
 * -----------------
 * Purpose:
 * This file implements the Footer component which serves as the main footer
 * for the ToDo application. It provides branding, copyright information, and
 * social media links in a responsive layout.
 *
 * Component Structure:
 * - Left section: App logo and name
 * - Middle section: Copyright text
 * - Right section: Social media links with icons
 *
 * Technical Details:
 * - Implemented as a standalone component
 * - Uses TailwindCSS for styling
 * - Responsive design with mobile-first approach
 * - External links open in new tabs with proper security attributes
 */
