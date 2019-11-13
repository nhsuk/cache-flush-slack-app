0.6.0 / TBC
===================
- Use `CSV` format rather than `JSON` for `allowed-users`
- Update unauthorized message to provide template for request
- Use orchestrator for slash command API
- Introduce ADRs for capturing key decisions

0.5.1 / 2019-11-11
===================
- Pass new env vars to app

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
- Set env vars in deployed apps

0.2.0 / 2019-11-08
===================
- Detail Slack app setup and app lifecycle
- DM user when cache flush request completes
- Simplify activity functions to a single responsibility
- Add section block helper for easier dynamic content building

0.1.0 / 2019-11-07
===================
- Initial setup code and config
