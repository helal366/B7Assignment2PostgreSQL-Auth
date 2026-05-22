[
  //   {
  //   "title": "Database connection timeout under load",
  //   "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
  //   "type": "bug",
  //   "status": "open"
  // },
  // {
  //   "title": "Login API returns 500 on invalid JWT",
  //   "description": "Server crashes instead of returning proper unauthorized response when token is malformed",
  //   "type": "bug",
  //   "status": "open"
  // },
  // {
  //   "title": "Pagination missing in issues list endpoint",
  //   "description": "GET /issues returns all records without pagination causing performance issues",
  //   "type": "feature_request",
  //   "status": "open"
  // },


  // {
  //   "title": "Add search filter for issues by title",
  //   "description": "Users need ability to search issues using keywords in title or description",
  //   "type": "feature_request",
  //   "status": "open"
  // },
  {
    "title": "Memory leak in background worker process",
    "description": "Worker service gradually increases memory usage during long runs",
    "type": "bug",
    "status": "in_progress"
  },
  {
    "title": "Add issue priority field (low, medium, high)",
    "description": "Allow users to set priority when creating an issue for better triage",
    "type": "feature_request",
    "status": "resolved"
  },
  {
    "title": "CORS blocking valid frontend requests",
    "description": "Frontend deployed on different domain is being blocked by misconfigured CORS policy",
    "type": "bug",
    "status": "open"
  },
  {
    "title": "Export issues to CSV",
    "description": "Admin users want to download all issues in CSV format for reporting",
    "type": "feature_request",
    "status": "open"
  },
  {
    "title": "Rate limiter blocking legitimate users",
    "description": "Users with normal traffic patterns are being rate-limited incorrectly during peak hours",
    "type": "bug",
    "status": "open"
  },
  {
    "title": "Add dark mode support in dashboard",
    "description": "Users want a dark theme option for better usability at night",
    "type": "feature_request",
    "status": "open"
  },
  {
    "title": "File upload fails for large images",
    "description": "Images above 5MB fail silently without proper error message",
    "type": "bug",
    "status": "in_progress"
  },
  {
    "title": "Implement role-based access control (RBAC)",
    "description": "Add permission system to restrict admin and user actions properly",
    "type": "feature_request",
    "status": "open"
  },
  {
    "title": "Incorrect timestamp in issue creation",
    "description": "Created_at field shows server time instead of UTC causing confusion in logs",
    "type": "bug",
    "status": "resolved"
  },
  {
    "title": "Improve API response time for /issues endpoint",
    "description": "Endpoint is slow when dataset exceeds 10k records, needs optimization",
    "type": "bug",
    "status": "open"
  },
  {
    "title": "Add email notifications for issue updates",
    "description": "Users should receive email alerts when issue status changes",
    "type": "feature_request",
    "status": "open"
  },
  {
    "title": "Fix duplicate issue creation on double click",
    "description": "Submitting form twice creates duplicate records in database",
    "type": "bug",
    "status": "open"
  }
]
