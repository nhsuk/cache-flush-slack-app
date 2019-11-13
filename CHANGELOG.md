0.7.0 / 2019-11-13
===================
- Open view prior to validation, increasing chance of having a usable
  `trigger_id`
- Add ADR covering decision and reason for opening initial view asap
- Provide error messages to the user for ease of debugging

0.6.0 / 2019-11-13
===================
- Use `CSV` format rather than `JSON` for `allowed-users`
- Update unauthorized message to provide template for request
- Use orchestrator for slash command API
- Introduce ADRs for capturing key decisions

0.5.1 / 2019-11-11
===================
- Pass new environment vars to app

0.5.0 / 2019-11-11
===================
- Verify request originated from Slack
- Verify user is allowed to make request
- Add some basic tests
- Log all verified and allowed requests
- Provide better messaging to client in the event of an error

0.4.0 / 2019-11-08
===================
- Rename `orchestrator` function to remove deployed function with capitalised
  `O` which was breaking when calling `client.startNew(...)` with an unknown
  function name

0.3.0 / 2019-11-08
===================
- Set environment variables in deployed apps

0.2.0 / 2019-11-08
===================
- Detail Slack app setup and app life cycle
- Send a message to the user when cache flush request completes
- Simplify activity functions to a single responsibility
- Add section block helper for easier dynamic content building

0.1.0 / 2019-11-07
===================
- Initial setup code and configuration
