export const projectDetails = {
    p1: `
        <h3>Overview</h3>
        <p class="desc">
            Designed and implemented a Tomasulo-style out-of-order RISC-V processor in SystemVerilog, moving beyond
            a traditional 5-stage in-order pipeline with dynamic scheduling, register renaming, and in-order commit.
            The design keeps independent instructions moving while long-latency cache, multiply, and divide operations
            remain in flight.
        </p>

        <h3>Core Architecture</h3>
        <p class="desc">
            The RTL includes register renaming, a circular reorder buffer (ROB), reservation stations, functional-unit issue
            logic, and a common data bus (CDB). These structures remove WAR/WAW hazards, track RAW dependencies, and preserve
            precise architectural state through in-order retirement.
        </p>

        <h3>Memory System</h3>
        <p class="desc">
            The memory subsystem includes parameterized instruction/data caches, a memory functional unit, and a split
            load-store queue. Stores remain ordered, while loads issue independently when safe through store masking, improving
            throughput without violating memory correctness.
        </p>

        <h3>Control Flow</h3>
        <p class="desc">
            Branching support includes a dedicated branch functional unit and global flush logic to recover from mispredictions.
            Younger instructions following a mispredicted branch are safely evicted from all pipeline stages, restoring the
            processor to a precise state.
        </p>

        <h3>Advanced Performance Features</h3>
        <p class="desc">
            Several architectural enhancements were explored to improve performance, including a pipelined tournament branch
            predictor combining GShare and two-level local history components, an aggressive next-line instruction prefetcher,
            and fully parameterized instruction and data caches. These features enabled evaluation of tradeoffs between IPC,
            latency, power, and area across multiple configurations.
        </p>

        <h3>Verification & Results</h3>
        <p class="desc">
            Correctness was verified with Spike and RVFI-based monitoring so out-of-order execution could be checked against
            in-order architectural commit. Performance was evaluated with benchmark IPC and cache metrics to measure the impact
            of branch prediction, cache configuration, and memory-system changes.
        </p>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/ECE411/tree/main/mp_ooo" target="_blank" rel="noreferrer">
                View Repo
            </a>
        </p>
    `,
    p2: `
        <h2>FPGA Pac-Man (HDMI)</h2>

        <p class="desc">
            Recreated Pac-Man on FPGA using a custom RTL HDMI graphics pipeline and a MicroBlaze-controlled
            game engine. The system combines cycle-timed rendering hardware with C-driven control logic,
            emphasizing memory-mapped graphics, BRAM organization, and hardware/software integration.
        </p>

        <h3>Rendering & Display Pipeline</h3>
        <p class="desc">
            The RTL renderer uses a BRAM-backed tilemap for the maze and sprite overlays for Pac-Man and
            the ghosts. A 28×36 map of 8×8 tiles reuses tile codes for walls, pellets, text, and lives,
            with tile data expanded into pixels through a custom ROM-based graphics path.
        </p>

        <h3>Sprites & Graphics Composition</h3>
        <p class="desc">
            Pac-Man and the ghosts are ROM-based sprites composed over the tile layer with priority ordering.
            Sprite positions, orientations, and visual states are updated through AXI4-Lite registers written
            by software, including directional Pac-Man frames and multi-bit ghost color states.
        </p>

        <h3>Game Logic & Control</h3>
        <p class="desc">
            All gameplay logic runs in C on a MicroBlaze processor, including keyboard input
            handling, movement validation, pellet collection, scoring, life tracking, and level
            resets. Tile and sprite updates are performed through AXI reads and writes to BRAM,
            allowing real-time modification of the maze and score display.
        </p>

        <h3>Ghost Behavior</h3>
        <p class="desc">
            Each ghost is implemented using a shared data structure and state machine with unique
            movement behavior inspired by the original game. Ghosts transition through boxed,
            release, active, and scared states, and use a breadth-first search (BFS) algorithm to
            compute valid paths through the maze toward dynamic target locations.
        </p>

        <h3>System Integration</h3>
        <p class="desc">
            The project integrates USB keyboard input, AXI-based peripherals, BRAM-backed graphics
            memory, and an HDMI output pipeline within a unified FPGA system. Debugging focused on
            display timing, memory updates, sprite composition, and reliable software control of RTL
            graphics hardware.
        </p>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/Pacman" target="_blank" rel="noreferrer">
                View Repo
            </a>
            <a class="btn" href="https://www.youtube.com/watch?v=ORMuu2yWL28" target="_blank" rel="noreferrer">
                View Demo
            </a>
        </p>
    `,
    p3: `
        <h2>College Dashboard</h2>

        <p class="desc">
            A desktop productivity application designed to centralize academic workflows for
            college students. The dashboard brings together tasks, deadlines, and schedules into
            a single interface, reducing context switching between learning management systems,
            notes, and standalone to-do apps.
        </p>

        <h3>Design Goals</h3>
        <ul>
            <li>Provide a single, distraction-free hub for academic organization</li>
            <li>Emphasize clarity, speed, and low cognitive overhead</li>
            <li>Build a foundation that can scale into a real, distributable product</li>
        </ul>

        <h3>Implementation</h3>
        <p class="desc">
            The application is built using React for the user interface and packaged as a desktop
            application using Electron. The architecture is designed to support incremental
            feature expansion, including persistent storage, analytics, and future paid tiers.
        </p>

        <h3>Product Direction</h3>
        <p class="desc">
            The project is being developed in phases, starting with a free core feature set and
            expanding toward advanced organization and productivity tools. The long-term goal is
            to create a polished, sellable application rather than a short-lived prototype.
        </p>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/collegeDashboard" target="_blank" rel="noreferrer">
                View Repo
            </a>
            <a class="btn" href="https://jacobmtorry.github.io/collegeDashboard/" target="_blank" rel="noreferrer">
                View Demo
            </a>
        </p>
    `,
    p4: `
        <h3>Core Architecture</h3>
        <p class="desc">
            The processor is built around a modular pipeline with stage registers between IF/ID, ID/EX, EX/MEM, and MEM/WB.
            The execute stage integrates ALU and comparison logic, while a centralized control structure manages instruction flow,
            register access, and pipeline state across all stages.
        </p>

        <h3>Hazard Handling</h3>
        <p class="desc">
            Data hazards are resolved using full forwarding paths from EX/MEM and MEM/WB stages back into execute, minimizing
            unnecessary stalls. Load-use hazards are detected and handled through targeted pipeline stalling, while control hazards
            are resolved using branch detection and pipeline flush logic to maintain correct execution.
        </p>

        <h3>Memory System</h3>
        <p class="desc">
            The design uses a dual-port memory interface separating instruction and data memory, with a blocking memory model
            controlled through handshake signals. Memory operations are coordinated across pipeline stages, ensuring correct
            load/store behavior even under stall conditions.
        </p>

        <h3>Control Flow</h3>
        <p class="desc">
            Branch instructions are resolved in the execute stage, with taken branches triggering pipeline flushes and program
            counter redirection. This ensures incorrect speculative instructions are removed while maintaining precise control
            flow throughout execution.
        </p>

        <h3>Verification & Results</h3>
        <p class="desc">
            The processor was verified against a Spike reference model using RVFI integration, ensuring instruction-level correctness.
            Performance was evaluated using IPC metrics under hazard-free and constrained conditions, validating correct pipeline
            behavior and efficient hazard resolution.
        </p>

        <h3>Tools & Skills</h3>
        <ul>
            <li>SystemVerilog (RTL Design)</li>
            <li>RISC-V (RV32I ISA)</li>
            <li>Computer Architecture (Pipelining, Hazards, Forwarding)</li>
            <li>Hardware Verification (Spike, RVFI)</li>
            <li>Digital Design & Debugging</li>
            <li>Pipeline Control Logic (Stalls, Flush, Hazard Detection)</li>
        </ul>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/ECE411/tree/main/mp_pipeline" target="_blank" rel="noreferrer">
                View Repo
            </a>
        </p>
    `,
};
