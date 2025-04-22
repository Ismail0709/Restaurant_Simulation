// app/api/simulation/route.js
export async function POST(req) {
    const { customers, servers = 1 } = await req.json();
  
    let completionTime = [];
    let waitingTime = [];
    let turnaroundTime = [];
  
    if (servers === 1) {
      // MM1 logic
      let currentTime = 0;
      customers.forEach(({ arrivalTime, servingTime }) => {
        const start = Math.max(currentTime, arrivalTime);
        const completion = start + servingTime;
        const waiting = start - arrivalTime;
        const turnaround = completion - arrivalTime;
  
        completionTime.push(completion);
        waitingTime.push(waiting);
        turnaroundTime.push(turnaround);
  
        currentTime = completion;
      });
    } else {
      // MMC logic
      let serverAvailableTimes = Array(servers).fill(0);
  
      customers.forEach(({ arrivalTime, servingTime }) => {
        let earliestServer = serverAvailableTimes.indexOf(Math.min(...serverAvailableTimes));
        const start = Math.max(serverAvailableTimes[earliestServer], arrivalTime);
        const completion = start + servingTime;
        const waiting = start - arrivalTime;
        const turnaround = completion - arrivalTime;
  
        serverAvailableTimes[earliestServer] = completion;
  
        completionTime.push(completion);
        waitingTime.push(waiting);
        turnaroundTime.push(turnaround);
      });
    }
  
    return Response.json({ completionTime, waitingTime, turnaroundTime });
  }
  